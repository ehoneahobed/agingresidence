import { appendFile } from 'fs';
import { join } from 'path';

export function log404Error(url: string) {
  const logMessage = `404 Error: ${url} - ${new Date().toISOString()}\n`;
  const logFilePath = join(process.cwd(), 'logs', '404-errors.log');

  appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to log 404 error:', err);
    } else {
      console.log('Logged 404 error:', logMessage);
    }
  });
}
