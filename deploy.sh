#!/bin/bash

# ==========================================
# Kesurved Herbal - VM Deployment Script
# ==========================================
# Run this script on your VM to pull the latest code,
# build the Next.js frontend, and restart the server.

echo "🚀 Starting deployment for Kesurved Herbal..."

# 1. Ensure we are in the correct directory (Optional: you can hardcode your VM path here)
# cd /path/to/your/project

# 2. Pull the latest code from Git (Uncomment if using Git on the VM)
# echo "📥 Pulling latest code..."
# git pull origin main

# 3. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 4. Build the Next.js production bundle
echo "🏗️ Building the Next.js application..."
npm run build

# 5. Restart the application using PM2
echo "🔄 Restarting the PM2 process..."
# If this is the first time running, use: pm2 start npm --name "kesurved-app" -- start
# Otherwise, just restart the existing process:
pm2 restart kesurved-app || pm2 start npm --name "kesurved-app" -- start

echo "✅ Deployment successful! The frontend is now live."
