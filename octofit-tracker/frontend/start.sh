#!/bin/bash
# OctoFit Tracker Frontend - Setup and Run Script

echo "🐙 OctoFit Tracker Frontend Setup"
echo "=================================="
echo ""

# Check if node_modules exists
if [ ! -d "octofit-tracker/frontend/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --prefix octofit-tracker/frontend
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Starting OctoFit Tracker React App..."
echo ""
echo "ℹ️  The app will open at: http://localhost:3000"
echo "ℹ️  Make sure the Django backend is running on port 8000"
echo ""
echo "For GitHub Codespaces:"
echo "  1. Update octofit-tracker/frontend/.env with your codespace name"
echo "  2. Set REACT_APP_API_PROTOCOL=https"
echo ""

npm start --prefix octofit-tracker/frontend
