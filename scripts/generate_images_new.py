import os
import json
import re
import requests
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database connection details
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# Directory to save images
IMAGE_DIRECTORY = os.getenv("IMAGE_DIRECTORY", "./public/images")

# Function to sanitize filenames
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)

# Function to download an image
def download_image(url, save_path):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error on bad status
        with open(save_path, 'wb') as file:
            file.write(response.content)
        return True
    except requests.RequestException as e:
        print(f"Failed to download {url}: {e}")
        return False

# Connect to the database
db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor = db.cursor()

# Ensure the image directory exists
os.makedirs(IMAGE_DIRECTORY, exist_ok=True)

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
                # Generate the image name with name and index
                image_name = f"{name}_{index + 1}.jpg"
                save_path = os.path.join(IMAGE_DIRECTORY, image_name).replace("\\", "/")
                
                if download_image(image_url, save_path):
                    relative_image_path = f"/listing_images/{image_name}"
                    relative_image_paths.append(relative_image_path)
                    print(f"Downloaded and saved image for listing {name} to {save_path}")

                    # Update the database with the new relative image paths as JSON
                    try:
                        # Initialize pictures_downloaded as a JSON array if it is NULL or empty
                        cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY() WHERE id_residence = %s AND (pictures_downloaded IS NULL OR pictures_downloaded = '')", (id_residence,))
                        cursor.execute("UPDATE residences SET pictures_downloaded = JSON_ARRAY_APPEND(pictures_downloaded, '$', %s) WHERE id_residence = %s", (relative_image_path, id_residence))
                        db.commit()
                        print(f"Updated database for listing {name} with path: {relative_image_path}")
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

print("Image processing completed.")
