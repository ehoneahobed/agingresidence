import os
import json
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database connection details
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# Connect to the database
db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)
cursor = db.cursor()

# Query to fetch the data
cursor.execute("SELECT type FROM residences_old WHERE type IS NOT NULL AND is_residence = 1")
rows = cursor.fetchall()

unique_types = set()

for row in rows:
    types = json.loads(row[0])
    for t in types:
        unique_types.add(t.strip())

# Close the connections
cursor.close()
db.close()

# Save the unique types to a file
with open("unique_types.txt", "w") as file:
    for unique_type in sorted(unique_types):
        file.write(f"{unique_type}\n")

print("Unique types have been saved to unique_types.txt")
