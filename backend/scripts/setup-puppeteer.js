import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Setting up Puppeteer configuration...');

// Check environment
const isProduction = process.env.NODE_ENV === 'production';
const isRender = process.env.RENDER === 'true';
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';

console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`Platform: ${process.platform}`);
console.log(`Render: ${isRender ? 'Yes' : 'No'}`);

// Skip Puppeteer download in production or when explicitly set
const shouldSkipDownload = isProduction || 
                          process.env.PUPPETEER_SKIP_DOWNLOAD === 'true' || 
                          process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true';

if (shouldSkipDownload) {
  console.log('✅ Skipping Puppeteer Chrome download (using system Chrome)');
  
  // Verify system Chrome is available
  const chromePaths = [];
  
  if (isWindows) {
    chromePaths.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    );
    if (process.env.LOCALAPPDATA) {
      chromePaths.push(path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe'));
    }
  } else if (isLinux) {
    chromePaths.push(
      '/usr/bin/google-chrome-stable',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/opt/google/chrome/chrome'
    );
  }
  
  let chromeFound = false;
  for (const chromePath of chromePaths) {
    if (fs.existsSync(chromePath)) {
      console.log(`✅ Found Chrome at: ${chromePath}`);
      chromeFound = true;
      
      // Set environment variable for runtime
      if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
        process.env.PUPPETEER_EXECUTABLE_PATH = chromePath;
        console.log(`📝 Set PUPPETEER_EXECUTABLE_PATH to: ${chromePath}`);
      }
      break;
    }
  }
  
  if (!chromeFound) {
    console.warn('⚠️  Warning: No Chrome installation found. PDF generation may fail.');
    console.warn('   Please install Google Chrome or set PUPPETEER_EXECUTABLE_PATH');
  }
  
} else {
  console.log('📦 Attempting to download Puppeteer Chrome...');
  
  try {
    // Try to download Puppeteer Chrome with SSL bypass if needed
    const downloadCommand = isWindows 
      ? 'set NODE_TLS_REJECT_UNAUTHORIZED=0 && npx puppeteer browsers install chrome'
      : 'NODE_TLS_REJECT_UNAUTHORIZED=0 npx puppeteer browsers install chrome';
    
    execSync(downloadCommand, { 
      stdio: 'inherit',
      env: { 
        ...process.env, 
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
        PUPPETEER_SKIP_DOWNLOAD: 'false'
      }
    });
    
    console.log('✅ Puppeteer Chrome downloaded successfully');
    
  } catch (error) {
    console.warn('⚠️  Puppeteer Chrome download failed, falling back to system Chrome');
    console.warn(`   Error: ${error.message}`);
    
    // Fall back to system Chrome
    const chromePaths = isWindows 
      ? ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
      : ['/usr/bin/google-chrome-stable', '/usr/bin/google-chrome'];
    
    for (const chromePath of chromePaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`✅ Using system Chrome: ${chromePath}`);
        process.env.PUPPETEER_EXECUTABLE_PATH = chromePath;
        break;
      }
    }
  }
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Create .cache directory for Puppeteer if it doesn't exist
const cacheDir = path.join(__dirname, '..', '.cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
  console.log('✅ Created .cache directory');
}

console.log('🎉 Puppeteer setup completed successfully!');
