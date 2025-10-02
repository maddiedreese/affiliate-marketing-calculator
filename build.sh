#!/bin/bash

# Clean install to ensure all dependencies are properly installed
echo "Cleaning existing node_modules..."
rm -rf node_modules package-lock.json

echo "Installing all dependencies..."
npm install

echo "Verifying TypeScript packages are installed..."
npm list typescript @types/react @types/node @types/react-dom

echo "Running build..."
npm run build

echo "Build completed successfully!"
