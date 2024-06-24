import os
import requests
import re
import json

# Function to sanitize filenames
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)

# Function to download and save an image
def download_image(url, save_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(save_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        return True
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {url}: {e}")
        return False

# Dummy data for testing
dummy_data = [
    {"q": "Arbor Ridge", "pictures": [
        {"thumbnail":"https://lh5.googleusercontent.com/p/AF1QipMPMBtBpIYPWW6wk2ttnNvMlYazXfMmPjPkuf4e=w203-h114-k-no","image":"https://lh5.googleusercontent.com/p/AF1QipMPMBtBpIYPWW6wk2ttnNvMlYazXfMmPjPkuf4e=w512-h288-k-no"},
        {"thumbnail":"https://lh5.googleusercontent.com/p/AF1QipM-AGPpXdLXtNyb3TkDRONgi0-vXCRxfNXAStTF=w203-h114-k-no","image":"https://lh5.googleusercontent.com/p/AF1QipM-AGPpXdLXtNyb3TkDRONgi0-vXCRxfNXAStTF=w1920-h1080-k-no"},
        {"thumbnail":"https://lh5.googleusercontent.com/p/AF1QipOYkKwsJ7uIVVtFzej80SGSe415Zp9yBiEdLFyz=w203-h135-k-no","image":"https://lh5.googleusercontent.com/p/AF1QipOYkKwsJ7uIVVtFzej80SGSe415Zp9yBiEdLFyz=w1620-h1080-k-no"}
    ]},
    {"q": "Blue Oaks", "pictures": [
        {"thumbnail":"https://lh5.googleusercontent.com/p/AF1QipP-YP2KjiOMbUsyFvbLujv2KtBuDa1uOd9RmJGU=w203-h109-k-no","image":"https://lh5.googleusercontent.com/p/AF1QipP-YP2KjiOMbUsyFvbLujv2KtBuDa1uOd9RmJGU=w1920-h1039-k-no"},
        {"thumbnail":"https://lh5.googleusercontent.com/p/AF1QipOJSRHIYk5h4VRMKzxQF-Pjjzuwc6gfxoXOUsoV=w203-h110-k-no","image":"https://lh5.googleusercontent.com/p/AF1QipOJSRHIYk5h4VRMKzxQF-Pjjzuwc6gfxoXOUsoV=w1920-h1044-k-no"}
    ]}
]

# Directory to save images
image_directory = 'agingresidence_listing_images'

# Create the directory if it doesn't exist
if not os.path.exists(image_directory):
    os.makedirs(image_directory)

# Function to fetch and update image paths locally
def process_images():
    local_image_paths = []

    for listing in dummy_data:
        name = sanitize_filename(listing["q"])
        pictures = listing["pictures"]

        for index, picture in enumerate(pictures):
            image_url = picture.get('image')
            if image_url:
                # Generate the image name with name and index
                image_name = f"{name}_{index + 1}.jpg"
                
                save_path = os.path.join(image_directory, image_name)
                
                if download_image(image_url, save_path):
                    local_image_paths.append(save_path)
                    print(f"Downloaded and saved image for listing {name} to {save_path}")
                else:
                    print(f"Failed to download image for listing {name}")

    # Print the local image paths for testing
    print("Local image paths:", local_image_paths)

# Main function
def main():
    process_images()

if __name__ == "__main__":
    main()
