import mysql from 'mysql2/promise';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const {
  NEW_DB_HOST,
  NEW_DB_USER,
  NEW_DB_PASSWORD,
  NEW_DB_DATABASE,
  BASE_URL = 'https://agingresidence.com',
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, 'image_cleanup_log.txt2');

async function logMessage(message) {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
}

async function validateImage(url) {
  try {
    const res = await axios.head(url);
    return res.status === 200;
  } catch (error) {
    await logMessage(`Error validating image ${url}: ${error.message}`);
    return false;
  }
}

async function cleanUpImageLinks(imageLinks) {
  const validLinks = await Promise.all(
    imageLinks.map(async (link) => {
      console.log(link);
      // const fullUrl = `${BASE_URL}${link}`;
      const fullUrl = `${link}`;
      const isValid = await validateImage(fullUrl);
      return isValid ? link : null;
    })
  );
  return validLinks.filter((link) => link !== null);
}

async function cleanUpDatabase() {
  await logMessage('Starting database cleanup...');

  const connection = await mysql.createConnection({
    host: NEW_DB_HOST,
    user: NEW_DB_USER,
    password: NEW_DB_PASSWORD,
    database: NEW_DB_DATABASE,
  });

  const [rows] = await connection.execute('SELECT id, gallery FROM Listing_old');

  for (const row of rows) {
    let galleryString = row.gallery;

    // Log the raw gallery data for debugging purposes
    await logMessage(`Listing ID: ${row.id}, Raw Gallery Data: ${galleryString}`);

    if (!galleryString) {
      await logMessage(`Skipping listing ${row.id} due to empty gallery data`);
      continue;
    }

    // Ensure galleryString is treated as a string
    galleryString = galleryString.toString();

    // Treat the gallery data as a comma-separated string
    const imageLinks = galleryString.split(',');

    // Clean up image links
    const validImages = await cleanUpImageLinks(imageLinks);

    // Update the database with all valid images in the required format
    if (validImages.length > 0) {
      await connection.execute('UPDATE Listing_old SET gallery = ? WHERE id = ?', [JSON.stringify(validImages), row.id]);
      await logMessage(`Updated listing ${row.id} with ${validImages.length} valid images.`);
    } else {
      await logMessage(`No valid images found for listing ${row.id}`);
    }
  }

  await logMessage('Database cleanup complete.');
  await connection.end();
}

cleanUpDatabase()
  .catch(async (error) => {
    console.error('Error cleaning up database:', error);
    await logMessage(`Error cleaning up database: ${error.message}`);
  });
