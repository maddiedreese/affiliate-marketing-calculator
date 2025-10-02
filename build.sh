#!/bin/bash

# Set environment variables
export NODE_ENV=production
export CI=false

echo "=== Starting Netlify Build Process ==="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean install to ensure all dependencies are properly installed
echo "Cleaning existing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Installing all dependencies with force flag..."
npm install --force

echo "Verifying package count..."
PACKAGE_COUNT=$(npm list --depth=0 2>/dev/null | wc -l)
echo "Total packages installed: $PACKAGE_COUNT"

echo "Verifying TypeScript packages are installed..."
npm list typescript @types/react @types/node @types/react-dom

echo "Running Next.js build..."
npm run build

echo "Build completed successfully!"
