#!/bin/bash
set -e

# ==========================================
# Kesurved Herbal - VM Update Script
# ==========================================
# Run this script on your VM to pull the latest code,
# sync the new database fields, build the app, and restart.

echo "🚀 Starting update for Kesurved Herbal..."

# 1. Pull the latest code from Git
echo "📥 Pulling latest code..."
git pull origin main

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Generate Prisma Client and Sync Database
# This is CRITICAL now because we added the DeliveryZone table
# and the new City/State fields to the Customer table.
echo "🗄️ Generating Prisma Client and Syncing Database..."
npx prisma generate
npx prisma db push --accept-data-loss

# 4. Build the Next.js production bundle
echo "🏗️ Building the Next.js application..."
npm run build

# 5. Restart the application using PM2
echo "🔄 Restarting the PM2 process..."
pm2 restart kesurved-app || pm2 start npm --name "kesurved-app" -- start

echo "✅ Update successful! The new checkout features and speed improvements are live."
