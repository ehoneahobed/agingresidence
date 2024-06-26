import os
import json
import re
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database connection details
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

NEW_DB_HOST = os.getenv("NEW_DB_HOST")
NEW_DB_USER = os.getenv("NEW_DB_USER")
NEW_DB_PASSWORD = os.getenv("NEW_DB_PASSWORD")
NEW_DB_DATABASE = os.getenv("NEW_DB_DATABASE")

# Function to sanitize and create slugs
def create_slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

# Function to reorder the operating hours
def reorder_hours(hours_json):
    days_order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    hours_dict = {entry: time for day in hours_json for entry, time in day.items()}
    ordered_hours = [{day: hours_dict.get(day, "Closed")} for day in days_order]
    return ordered_hours

# Function to standardize category names
def standardize_category(category):
    standard_category_map = {
        "assisted living facility": "Assisted Living Facility",
        "retirement home": "Retirement Home",
        "retirement community": "Retirement Community",
        "nursing home": "Nursing Home",
        "group home": "Group Home",
        "senior citizen center": "Senior Citizen Center",
        "hospice": "Hospice",
        "rehabilitation center": "Rehabilitation Center",
        "day care center": "Day Care Center",
        "community center": "Community Center",
        "memory care facility": "Memory Care Facility",
        "independent living community": "Independent Living Community",
        "continuing care retirement community": "Continuing Care Retirement Community",
        "respite care": "Respite Care",
        "home health care service": "Home Health Care Service",
        "adult day health center": "Adult Day Health Center"
    }
    return standard_category_map.get(category.lower().strip(), None)

# Connect to the old database
db_old = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor_old = db_old.cursor()

# Connect to the new database
db_new = mysql.connector.connect(
    host=NEW_DB_HOST,
    user=NEW_DB_USER,
    password=NEW_DB_PASSWORD,
    database=NEW_DB_DATABASE
)
cursor_new = db_new.cursor()

# Check if the default author exists in the new database
default_author_id = 1
cursor_new.execute("SELECT id FROM Author WHERE id = %s", (default_author_id,))
author = cursor_new.fetchone()
if not author:
    print(f"Inserting default author with id {default_author_id}")
    cursor_new.execute("INSERT INTO Author (id, name) VALUES (%s, %s)", (default_author_id, 'Aging Residence Team'))
    db_new.commit()

# Fetch all categories from the new database
cursor_new.execute("SELECT id, name FROM Category")
categories = cursor_new.fetchall()
category_map = {category_name.lower(): category_id for category_id, category_name in categories}

# Batch size for processing
batch_size = 100
offset = 0

while True:
    # Fetch a batch of records from the old database
    cursor_old.execute("""
    SELECT id_residence, q, address, phone, website, hours, similar_places, pictures_downloaded, average_rating, type, description_generated_cleaned, review_generated_cleaned, state, longitude, latitude 
    FROM residences 
    WHERE is_residence = 1 AND (copy_status IS NULL OR copy_status != 1)
    LIMIT %s OFFSET %s
    """, (batch_size, offset))
    rows = cursor_old.fetchall()

    if not rows:
        break  # No more records to process

    for row in rows:
        (id_residence, q, address, phone, website, hours_json, similar_places_json, 
         pictures_downloaded_json, average_rating, types_json, 
         description_generated, review_generated, state, longitude, latitude) = row
        
        print(f"Processing listing {q} (ID: {id_residence})")
        
        slug = create_slug(q)

        # Check if listing already exists in the new database
        cursor_new.execute("SELECT id FROM Listing WHERE slug = %s", (slug,))
        existing_listing = cursor_new.fetchone()
        if existing_listing:
            print(f"Listing {q} already exists in the new database with slug {slug}. Skipping.")
            continue
        
        # Assign default values for missing or invalid longitude and latitude
        if not longitude or not latitude:
            print(f"Missing longitude or latitude for listing {q}, assigning default values")
            longitude = 0.0
            latitude = 0.0
        else:
            try:
                longitude = float(longitude)
                latitude = float(latitude)
            except ValueError:
                print(f"Invalid longitude or latitude for listing {q}, assigning default values")
                longitude = 0.0
                latitude = 0.0
        
        print(f"Longitude: {longitude}, Latitude: {latitude}")
        
        gallery = json.loads(pictures_downloaded_json) if pictures_downloaded_json else []
        if not gallery and pictures_downloaded_json:
            gallery = json.loads(pictures_downloaded_json)

        image = gallery[0] if gallery else "https://agingresidence.com/listing_images/aging_residence_images/default_image.jpg"
        operating_hours = reorder_hours(json.loads(hours_json)) if hours_json else []
        
        # Ensure operating_hours JSON string does not exceed database limits
        operating_hours_json = json.dumps(operating_hours)
        if len(operating_hours_json) > 65535:  # MySQL TEXT type can hold up to 65535 characters
            print(f"Truncating operatingHours for listing {q} as it exceeds the limit")
            operating_hours_json = operating_hours_json[:65535]
        
        types = json.loads(types_json) if types_json else []
        similar_places = json.loads(similar_places_json) if similar_places_json else []
        
        # Insert location into the new database
        print(f"Inserting location for {q}")
        cursor_new.execute("INSERT INTO Location (longitude, latitude, address) VALUES (%s, %s, %s)", (longitude, latitude, address))
        location_id = cursor_new.lastrowid
        
        # Insert listing into the new database
        print(f"Inserting listing {q}")
        cursor_new.execute("""
            INSERT INTO Listing (slug, name, views, phone, state, image, gallery, description, rating, website, operatingHours, tags, locationId, authorId, type_of_service, review_generated, similar_places, status) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (slug, q, 0, phone, state, image, json.dumps(gallery), description_generated, average_rating, website, operating_hours_json, json.dumps([]), location_id, default_author_id, json.dumps(types), review_generated, json.dumps(similar_places), 'draft'))
        listing_id = cursor_new.lastrowid
        print(f"Inserted listing {q} with ID {listing_id}")
        
        # Insert categories into CategoryListing in the new database
        print(f"Inserting categories for {q}")
        for type_name in types:
            print(f"Processing category {type_name}")
            category_id = category_map.get(type_name.lower().strip())
            if category_id:
                cursor_new.execute("INSERT INTO CategoryListing (listingId, categoryId) VALUES (%s, %s)", (listing_id, category_id))
        
        # Commit after each listing to ensure changes are saved
        db_new.commit()
        print(f"Committed changes for listing {q}")

        # Update the old database to mark the record as successfully copied
        cursor_old.execute("UPDATE residences SET copy_status = 1 WHERE id_residence = %s", (id_residence,))
        db_old.commit()
        print(f"Marked listing {q} as successfully copied in the old database")

    # Increment the offset to fetch the next set of records
    offset += batch_size

# Close the connections
cursor_old.close()
db_old.close()
cursor_new.close()
db_new.close()

print("Data transfer completed.")
