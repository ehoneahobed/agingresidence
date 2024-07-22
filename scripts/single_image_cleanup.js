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
  PLACEHOLDER_IMAGE = '/listing_images/default_image.jpg',
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, 'single_image_cleanup_log.txt');

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

async function cleanUpDatabase() {
  await logMessage('Starting database cleanup...');

  const connection = await mysql.createConnection({
    host: NEW_DB_HOST,
    user: NEW_DB_USER,
    password: NEW_DB_PASSWORD,
    database: NEW_DB_DATABASE,
  });

  const [rows] = await connection.execute('SELECT id, image FROM Listing');

  for (const row of rows) {
    let imageUrl = row.image;

    // Log the raw image data for debugging purposes
    await logMessage(`Listing ID: ${row.id}, Raw Image Data: ${imageUrl}`);

    if (!imageUrl) {
      await logMessage(`Skipping listing ${row.id} due to empty image data`);
      continue;
    }

    // Ensure imageUrl is treated as a string
    imageUrl = imageUrl.toString();

    // Validate the image URL
    const fullUrl = `${BASE_URL}${imageUrl}`;
    const isValid = await validateImage(fullUrl);

    if (isValid) {
      await logMessage(`Valid image found for listing ${row.id}: ${fullUrl}`);
    } else {
      await connection.execute('UPDATE Listing SET image = ? WHERE id = ?', [PLACEHOLDER_IMAGE, row.id]);
      await logMessage(`Invalid image for listing ${row.id}. Set image to placeholder image.`);
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
