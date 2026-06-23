#!/bin/bash

# WrkZone Android App Build Script
# This script builds the app for Google Play Store

echo "🚀 Building WrkZone Android App for Google Play Store..."

# Step 1: Build Next.js
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Next.js build failed!"
  exit 1
fi

# Step 2: Sync to Android
echo "🔄 Syncing to Android..."
npx cap sync android

if [ $? -ne 0 ]; then
  echo "❌ Capacitor sync failed!"
  exit 1
fi

# Step 3: Build Android App Bundle
echo "🔨 Building Android App Bundle..."
cd android
./gradlew bundleRelease

if [ $? -ne 0 ]; then
  echo "❌ Android build failed!"
  exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Output: android/app/build/outputs/bundle/release/app-release.aab"
echo "📤 Ready to upload to Google Play Store!"
