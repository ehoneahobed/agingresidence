import os
import json
import re
import requests
import mysql.connector
from dotenv import load_dotenv
import paramiko

# Load environment variables from .env file
load_dotenv()

# Database connection details
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# Remote server details
REMOTE_HOST = os.getenv("REMOTE_HOST")
REMOTE_USER = os.getenv("REMOTE_USER")
REMOTE_PASSWORD = os.getenv("REMOTE_PASSWORD")
REMOTE_IMAGE_DIRECTORY = os.getenv("IMAGE_DIRECTORY")

log_file_path = "image_download.log"

def log_message(message):
    with open(log_file_path, 'a') as log_file:
        log_file.write(message + "\n")

log_message(f"Remote image directory: {REMOTE_IMAGE_DIRECTORY}")

# Function to sanitize filenames
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)

# Function to download an image
def download_image(url, save_path):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error on bad status
        return response.content
    except requests.RequestException as e:
        log_message(f"Failed to download {url}: {e}")
        return None

# Function to upload image to remote server
def upload_image_to_remote(ssh_client, image_content, remote_path):
    try:
        sftp = ssh_client.open_sftp()
        with sftp.open(remote_path, 'wb') as remote_file:
            remote_file.write(image_content)
        sftp.close()
        return True
    except Exception as e:
        log_message(f"Failed to upload image to {remote_path}: {e}")
        return False

# Connect to the remote server via SSH
ssh_client = paramiko.SSHClient()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    ssh_client.connect(REMOTE_HOST, username=REMOTE_USER, password=REMOTE_PASSWORD)
    log_message(f"Connected to {REMOTE_HOST} via SSH")
except Exception as e:
    log_message(f"Failed to connect to {REMOTE_HOST} via SSH: {e}")
    raise

# Connect to the database
db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor = db.cursor()

# Query to fetch listings
limit = 10
offset = 0

while True:
    cursor.execute("SELECT id_residence, q, pictures FROM residences WHERE pictures IS NOT NULL AND (pictures_downloaded IS NULL OR pictures_downloaded = '') LIMIT %s OFFSET %s", (limit, offset))
    rows = cursor.fetchall()
    
    if not rows:
        break
    
    for row in rows:
        id_residence, name, pictures_json = row
        name = sanitize_filename(name)
        pictures = json.loads(pictures_json)
        relative_image_paths = []

        for index, picture in enumerate(pictures):
            image_url = picture.get('image')
            if image_url:
                image_name = f"{name}_{index + 1}.jpg"
                remote_save_path = os.path.join(REMOTE_IMAGE_DIRECTORY, image_name).replace("\\", "/")

                log_message(f"Downloading image from {image_url}")

                image_content = download_image(image_url, remote_save_path)
                if image_content:
                    log_message(f"Uploading image to {remote_save_path}")

                    if upload_image_to_remote(ssh_client, image_content, remote_save_path):
                        relative_image_path = f"/listing_images/{image_name}"
                        relative_image_paths.append(relative_image_path)
                        log_message(f"Downloaded and saved image for listing {name} to {remote_save_path}")

                        # Update the database with the new relative image paths as JSON
                        try:
                            cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY() WHERE id_residence = %s AND (pictures_downloaded IS NULL OR pictures_downloaded = '')", (id_residence,))
                            cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY_APPEND(pictures_downloaded, '$', %s) WHERE id_residence = %s", (relative_image_path, id_residence))
                            db.commit()
                            log_message(f"Updated database for listing {name} with path: {relative_image_path}")
                        except mysql.connector.Error as err:
                            log_message(f"Error updating database for listing {name}: {err}")
                        except Exception as e:
                            log_message(f"Unexpected error: {e}")
                    else:
                        log_message(f"Failed to upload image for listing {name}")
                else:
                    log_message(f"Failed to download image for listing {name}")

    offset += limit  # Increment the offset to fetch the next set of listings

# Close the connections
cursor.close()
db.close()
ssh_client.close()

log_message("Image processing completed.")
