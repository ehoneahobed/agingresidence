import mysql.connector
import json
import logging
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get old database connection details from environment variables
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Function to reorder the operating hours
def reorder_hours(hours_json):
    days_order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    hours_dict = {entry: time for day in hours_json for entry, time in day.items()}
    ordered_hours = [{day: hours_dict.get(day, "Closed")} for day in days_order]
    return ordered_hours

# Function to check if the hours are already ordered
def is_ordered(hours_json):
    days_order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    return all(list(day.keys())[0] == expected_day for day, expected_day in zip(hours_json, days_order))

# Connect to the old database
db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor = db.cursor()

# Query to fetch the operating hours
cursor.execute("SELECT id_residence, hours FROM residences WHERE hours IS NOT NULL")
rows = cursor.fetchall()

for row in rows:
    id_residence, operating_hours_json = row
    operating_hours = json.loads(operating_hours_json)
    
    if not is_ordered(operating_hours):
        # Reorder the operating hours
        ordered_hours = reorder_hours(operating_hours)
        ordered_hours_json = json.dumps(ordered_hours)

        # Update the database with the ordered operating hours
        cursor.execute("UPDATE residences SET hours = %s WHERE id_residence = %s", (ordered_hours_json, id_residence))
        db.commit()
        logging.info(f"Updated operating hours for residence ID {id_residence}")
    else:
        logging.info(f"Operating hours for residence ID {id_residence} are already ordered")

# Close the connections
cursor.close()
db.close()

logging.info("Operating hours have been reordered and updated in the database.")
