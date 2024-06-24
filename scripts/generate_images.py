import os
import json
import re
import paramiko
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database connection details
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# SSH connection details
REMOTE_HOST = os.getenv("REMOTE_HOST")
REMOTE_USER = os.getenv("REMOTE_USER")
REMOTE_PASSWORD = os.getenv("REMOTE_PASSWORD")
IMAGE_DIRECTORY = os.getenv("IMAGE_DIRECTORY")

# Function to sanitize filenames
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)

# Function to execute a command on the remote server
def execute_command(ssh, command):
    stdin, stdout, stderr = ssh.exec_command(command)
    exit_status = stdout.channel.recv_exit_status()
    stdout_data = stdout.read().decode()
    stderr_data = stderr.read().decode()
    return exit_status, stdout_data, stderr_data

# Function to download and save an image on the remote server
def download_image_on_remote(ssh, url, save_path):
    command = f"curl -o {save_path} {url}"
    exit_status, stdout, stderr = execute_command(ssh, command)
    if exit_status != 0:
        print(f"Failed to download {url}: {stderr}")
        return False
    return True

# Connect to the database
db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor = db.cursor()

# Connect to the remote server via SSH
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(REMOTE_HOST, username=REMOTE_USER, password=REMOTE_PASSWORD)

# Ensure the image directory exists on the remote server
execute_command(ssh, f"mkdir -p {IMAGE_DIRECTORY}")

# Query to fetch 2 listings at a time
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
        local_image_paths = []

        for index, picture in enumerate(pictures):
            image_url = picture.get('image')
            if image_url:
                # Generate the image name with name and index
                image_name = f"{name}_{index + 1}.jpg"
                
                save_path = os.path.join(IMAGE_DIRECTORY, image_name).replace("\\", "/")
                
                if download_image_on_remote(ssh, image_url, save_path):
                    remote_image_path = f"https://agingresidence.com/listing_images/{image_name}"
                    local_image_paths.append(remote_image_path)
                    print(f"Downloaded and saved image for listing {name} to {save_path}")
                    # Update the database with the new local image paths as JSON after each image download
                    try:
                        # Initialize pictures_downloaded as a JSON array if it is NULL or empty
                        cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY() WHERE id_residence = %s AND (pictures_downloaded IS NULL OR pictures_downloaded = '')", (id_residence,))
                        cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY_APPEND(pictures_downloaded, '$', %s) WHERE id_residence = %s", (remote_image_path, id_residence))
                        db.commit()  # Commit the changes after each update
                        print(f"Updated database for listing {name} with path: {remote_image_path}")
                    except mysql.connector.Error as err:
                        print(f"Error updating database for listing {name}: {err}")
                    except Exception as e:
                        print(f"Unexpected error: {e}")
                else:
                    print(f"Failed to download image for listing {name}")

    offset += limit  # Increment the offset to fetch the next set of listings

# Close the connections
cursor.close()
db.close()
ssh.close()

print("Image processing completed.")
