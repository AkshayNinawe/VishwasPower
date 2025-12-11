const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  // Skip download in production since we use system Chrome
  skipDownload: process.env.NODE_ENV === 'production',
  // Use system Chrome in production
  executablePath: process.env.NODE_ENV === 'production' 
    ? process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable'
    : undefined,
};
