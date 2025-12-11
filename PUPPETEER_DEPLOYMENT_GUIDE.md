# Puppeteer Deployment Guide

This guide explains how to handle Puppeteer deployment issues, particularly the SSL certificate chain problems that occur during npm install.

## Problem

Puppeteer fails to download Chrome during `npm install` due to SSL certificate chain issues:
```
Error: ERROR: Failed to set up chrome-headless-shell v143.0.7499.40! 
Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.
Error: self-signed certificate in certificate chain
```

## Solution Overview

We've implemented a comprehensive solution that:
1. **Skips Puppeteer Chrome download** during npm install
2. **Uses system Chrome** instead of bundled Chrome
3. **Handles both development and production** environments
4. **Provides fallback mechanisms** for different scenarios

## Files Modified

### 1. `backend/package.json`
- Added `"skipDownload": true` in puppeteer config
- Added `postinstall` script to run setup

### 2. `backend/.puppeteerrc.cjs`
- Enhanced configuration for cross-platform support
- Automatic Chrome path detection
- Environment-based skip download logic

### 3. `backend/scripts/setup-puppeteer.js`
- Intelligent Chrome detection for Windows/Linux
- SSL bypass for Chrome download if needed
- Fallback to system Chrome
- Directory creation for uploads and cache

### 4. `render.yaml`
- Updated environment variables
- Added SSL bypass for production
- Better health check endpoint
- Optimized build command

### 5. `backend/Dockerfile`
- Chrome installation in Docker image
- Environment variables set before npm install
- Setup script execution
- Directory creation

## Environment Variables

### Development (Windows)
```bash
# Optional - will auto-detect
PUPPETEER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
```

### Production (Render/Linux)
```bash
NODE_ENV=production
RENDER=true
PUPPETEER_SKIP_DOWNLOAD=true
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## How It Works

### Development Environment
1. `npm install` runs with `skipDownload: true`
2. `postinstall` script runs `setup-puppeteer.js`
3. Script detects Windows Chrome installation
4. Sets `PUPPETEER_EXECUTABLE_PATH` automatically
5. PDF generation uses system Chrome

### Production Environment (Render)
1. Docker builds with Chrome pre-installed
2. Environment variables skip Puppeteer download
3. `setup-puppeteer.js` verifies Chrome availability
4. Application uses `/usr/bin/google-chrome-stable`

## Deployment Steps

### For Render.com
1. **Push code** with all the modified files
2. **Environment variables** are set in `render.yaml`
3. **Docker build** installs Chrome and dependencies
4. **Setup script** verifies configuration
5. **Application starts** with system Chrome

### For Other Platforms
1. **Install Chrome** on the server
2. **Set environment variables**:
   ```bash
   export NODE_ENV=production
   export PUPPETEER_SKIP_DOWNLOAD=true
   export PUPPETEER_EXECUTABLE_PATH=/path/to/chrome
   ```
3. **Run npm install** (will skip Puppeteer download)
4. **Start application**

## Troubleshooting

### Chrome Not Found
```bash
# Check Chrome installation
which google-chrome-stable
# or
ls -la /usr/bin/google-chrome*
```

### PDF Generation Fails
```bash
# Test Chrome manually
google-chrome-stable --version
google-chrome-stable --headless --dump-dom https://www.google.com
```

### SSL Issues During Install
```bash
# Temporary SSL bypass
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm install
```

## Testing

### Test Setup Script
```bash
cd backend
node scripts/setup-puppeteer.js
```

### Test PDF Generation
```bash
# Start server
npm start

# Test endpoint (in another terminal)
curl -X POST http://localhost:8000/api/autoData/download-all-forms \
  -H "Content-Type: application/json" \
  -d '{"projectName":"Test","companyName":"Test"}' \
  --output test.pdf
```

## Benefits

1. **Reliable Deployment**: No more SSL certificate failures
2. **Faster Builds**: Skips large Chrome download
3. **Cross-Platform**: Works on Windows, Linux, Docker
4. **Automatic Fallback**: Handles various Chrome installations
5. **Production Ready**: Optimized for Render.com and other platforms

## Chrome Installation Paths

### Windows
- `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
- `%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe`

### Linux
- `/usr/bin/google-chrome-stable`
- `/usr/bin/google-chrome`
- `/usr/bin/chromium-browser`
- `/usr/bin/chromium`

### Docker (Render)
- `/usr/bin/google-chrome-stable` (installed via Dockerfile)

## Future Maintenance

1. **Update Chrome paths** if needed in setup script
2. **Monitor Puppeteer updates** for API changes
3. **Test deployment** after major Node.js updates
4. **Keep Dockerfile** Chrome installation updated

This solution ensures reliable PDF generation across all environments while avoiding the SSL certificate issues that plague Puppeteer installations.
