import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

console.log('=== Puppeteer Debug Script ===');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PUPPETEER_EXECUTABLE_PATH:', process.env.PUPPETEER_EXECUTABLE_PATH);
console.log('RENDER:', process.env.RENDER);

// Check for Chrome installations
const possiblePaths = [
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/opt/google/chrome/chrome',
  '/opt/render/.cache/puppeteer/chrome'
];

console.log('\n=== Checking Chrome installations ===');
for (const chromePath of possiblePaths) {
  if (chromePath.includes('cache')) {
    // Check cache directory
    try {
      if (fs.existsSync(chromePath)) {
        const contents = fs.readdirSync(chromePath);
        console.log(`✓ Cache directory exists: ${chromePath}`);
        console.log(`  Contents: ${contents.join(', ')}`);
        
        // Look for Chrome executable in subdirectories
        for (const item of contents) {
          if (item.startsWith('linux-')) {
            const execPath = path.join(chromePath, item, 'chrome-linux64', 'chrome');
            if (fs.existsSync(execPath)) {
              console.log(`  ✓ Chrome executable found: ${execPath}`);
            } else {
              console.log(`  ✗ Chrome executable not found: ${execPath}`);
            }
          }
        }
      } else {
        console.log(`✗ Cache directory not found: ${chromePath}`);
      }
    } catch (error) {
      console.log(`✗ Error checking cache: ${error.message}`);
    }
  } else {
    // Check regular paths
    if (fs.existsSync(chromePath)) {
      console.log(`✓ Chrome found: ${chromePath}`);
    } else {
      console.log(`✗ Chrome not found: ${chromePath}`);
    }
  }
}

// Try to get Puppeteer's default executable path
console.log('\n=== Puppeteer Configuration ===');
console.log('Using puppeteer-core - no default executable path available');
console.log('Must specify executablePath in launch options');

// Try to launch Puppeteer
console.log('\n=== Testing Puppeteer Launch ===');
try {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
  
  console.log('✓ Puppeteer launched successfully with default settings');
  
  const page = await browser.newPage();
  await page.setContent('<html><body><h1>Test</h1></body></html>');
  
  console.log('✓ Page created and content set successfully');
  
  await browser.close();
  console.log('✓ Browser closed successfully');
  
} catch (error) {
  console.log('✗ Error launching Puppeteer:', error.message);
  
  // Try with explicit executable path
  console.log('\n=== Trying with explicit Chrome path ===');
  const testPaths = [
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    process.env.PUPPETEER_EXECUTABLE_PATH
  ].filter(Boolean);
  
  for (const testPath of testPaths) {
    if (fs.existsSync(testPath)) {
      try {
        console.log(`Trying with: ${testPath}`);
        const browser = await puppeteer.launch({
          headless: true,
          executablePath: testPath,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
          ]
        });
        
        console.log(`✓ Success with: ${testPath}`);
        await browser.close();
        break;
        
      } catch (pathError) {
        console.log(`✗ Failed with ${testPath}: ${pathError.message}`);
      }
    } else {
      console.log(`✗ Path doesn't exist: ${testPath}`);
    }
  }
}

console.log('\n=== Debug Complete ===');
