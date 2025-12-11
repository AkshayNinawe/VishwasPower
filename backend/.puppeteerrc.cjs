const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer - use Render's cache directory
  cacheDirectory: process.env.RENDER === 'true' 
    ? '/opt/render/.cache/puppeteer'
    : join(__dirname, '.cache', 'puppeteer'),
  
  // Allow download in Render environment, skip in other production environments
  skipDownload: process.env.RENDER === 'true' 
    ? false 
    : (process.env.NODE_ENV === 'production' || 
       process.env.PUPPETEER_SKIP_DOWNLOAD === 'true' || 
       process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true'),
  
  // Use system Chrome only when not in Render
  executablePath: process.env.RENDER === 'true' 
    ? undefined  // Let Puppeteer auto-detect in Render
    : (process.env.PUPPETEER_EXECUTABLE_PATH || 
       (process.env.NODE_ENV === 'production' 
         ? (process.platform === 'win32' 
             ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
             : '/usr/bin/google-chrome-stable')
         : undefined)),
};
