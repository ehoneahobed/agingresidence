import mysql.connector
import re
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get database connection details from environment variables
OLD_DB_HOST = os.getenv("OLD_DB_HOST")
OLD_DB_USER = os.getenv("OLD_DB_USER")
OLD_DB_PASSWORD = os.getenv("OLD_DB_PASSWORD")
OLD_DB_DATABASE = os.getenv("OLD_DB_DATABASE")

# Function to extract state from address
def extract_state(address):
    if address is None:
        return None
    match = re.search(r',\s([A-Z]{2})\s\d{5}', address)
    return match.group(1) if match else None

def column_exists(cursor, table_name, column_name):
    cursor.execute(f"SHOW COLUMNS FROM {table_name} LIKE '{column_name}'")
    return cursor.fetchone() is not None

# Connect to the old database
old_db = mysql.connector.connect(
    host=OLD_DB_HOST,
    user=OLD_DB_USER,
    password=OLD_DB_PASSWORD,
    database=OLD_DB_DATABASE
)

cursor = old_db.cursor()

# Check if the state column already exists and add if not
print("Checking if 'state' column exists...")
if not column_exists(cursor, 'residences', 'state'):
    print("'state' column does not exist. Adding column...")
    cursor.execute("ALTER TABLE residences ADD COLUMN state VARCHAR(2)")
    print("'state' column added.")
else:
    print("'state' column already exists.")

# Fetch addresses
print("Fetching addresses from the database...")
cursor.execute("SELECT id_residence, address FROM residences")
rows = cursor.fetchall()
print(f"Fetched {len(rows)} rows from the database.")

# Update the state column based on the address
print("Updating state column...")
for index, row in enumerate(rows):
    id_residence, address = row
    state = extract_state(address)
    if state:
        cursor.execute("UPDATE residences SET state = %s WHERE id_residence = %s", (state, id_residence))
        if (index + 1) % 100 == 0:  # Print progress every 100 rows
            print(f"Updated {index + 1} rows...")

# Commit the changes
print("Committing changes to the database...")
old_db.commit()

# Close the connections
cursor.close()
old_db.close()

print("State column updated successfully.")
