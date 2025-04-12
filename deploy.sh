#!/bin/bash

# 🎨 FRONTEND BUILD
echo "🔧 Building frontend..."
cd frontend
npm install
npm run build

# 🔁 BACKEND RESTART
echo "♻️ Restarting FastAPI backend..."
sudo systemctl restart accounting-api

echo "✅ Deployment complete!"
