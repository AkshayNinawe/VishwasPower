const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  
  // Skip download in production or when explicitly set
  skipDownload: process.env.NODE_ENV === 'production' || 
                process.env.PUPPETEER_SKIP_DOWNLOAD === 'true' || 
                process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true',
  
  // Use system Chrome in production or when specified
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || 
                  (process.env.NODE_ENV === 'production' 
                    ? (process.platform === 'win32' 
                        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                        : '/usr/bin/google-chrome-stable')
                    : undefined),
};
