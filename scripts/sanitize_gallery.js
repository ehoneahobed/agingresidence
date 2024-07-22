import mysql from 'mysql2/promise';
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
const logFilePath = path.join(__dirname, 'sanitize_gallery_log.txt');

async function logMessage(message) {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
}

async function sanitizeGallery() {
  await logMessage('Starting gallery sanitization...');

  const connection = await mysql.createConnection({
    host: NEW_DB_HOST,
    user: NEW_DB_USER,
    password: NEW_DB_PASSWORD,
    database: NEW_DB_DATABASE,
  });

  const [rows] = await connection.execute('SELECT id, gallery FROM Listing_old');

  for (const row of rows) {
    let galleryData = row.gallery;

    // Log the raw gallery data for debugging purposes
    await logMessage(`Listing ID: ${row.id}, Raw Gallery Data: ${galleryData}`);

    if (!galleryData) {
      await logMessage(`Skipping listing ${row.id} due to empty gallery data`);
      continue;
    }

    // Ensure galleryData is treated as a string and parsed as JSON
    galleryData = galleryData.toString();
    const imageLinks = galleryData.split(',');

    // Sanitize the image URLs
    const sanitizedGallery = imageLinks.map((url) => url.replace(BASE_URL, '')).filter((url) => url !== '');

    // Update the database with the sanitized gallery data or an empty JSON array if no valid images found
    const updateGallery = sanitizedGallery.length > 0 ? sanitizedGallery : [];
    await connection.execute('UPDATE Listing_old SET gallery = ? WHERE id = ?', [JSON.stringify(updateGallery), row.id]);
    await logMessage(`Updated listing ${row.id} with sanitized gallery data.`);
  }

  await logMessage('Gallery sanitization complete.');
  await connection.end();
}

sanitizeGallery()
  .catch(async (error) => {
    console.error('Error sanitizing gallery:', error);
    await logMessage(`Error sanitizing gallery: ${error.message}`);
  });
