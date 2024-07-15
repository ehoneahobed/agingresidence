import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Database connection details
DB_CONFIG = {
    'host': os.getenv('NEW_DB_HOST'),
    'user': os.getenv('NEW_DB_USER'),
    'password': os.getenv('NEW_DB_PASSWORD'),
}

# Connect to the MySQL server
conn = mysql.connector.connect(**DB_CONFIG)
apfm_cursor = conn.cursor(dictionary=True)
agingresidence_cursor = conn.cursor()

# Fetch data from the apfm residences table
apfm_cursor.execute("USE apfm")
apfm_cursor.execute("SELECT id_residence, q, data_id FROM residences")
apfm_records = apfm_cursor.fetchall()

print(f"Fetched {len(apfm_records)} records from the residences table in apfm database.")

# Update the Listing table in agingresidence_db with data_id
agingresidence_cursor.execute("USE agingresidence_db")
update_query = "UPDATE Listing SET data_id = %s WHERE name = %s"

updated_count = 0

for record in apfm_records:
    data_id = record['data_id']
    q = record['q']
    agingresidence_cursor.execute(update_query, (data_id, q))
    
    if agingresidence_cursor.rowcount > 0:
        updated_count += 1
        print(f"Updated Listing: name = {q}, data_id = {data_id}")

# Commit the changes and close the connections
conn.commit()
apfm_cursor.close()
agingresidence_cursor.close()
conn.close()

print(f"data_id column updated successfully in the Listing table. Total records updated: {updated_count}")
