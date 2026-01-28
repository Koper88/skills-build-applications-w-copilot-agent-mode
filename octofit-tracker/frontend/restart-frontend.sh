#!/bin/bash

# Quick Restart Script for React Frontend
# Use this to restart the React development server

echo "🔄 Restarting React Frontend"
echo "============================="
echo ""

# Find and kill npm/react processes on port 3000
echo "1️⃣  Stopping existing React server..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "   No server running on port 3000"
sleep 1

# Also try to kill by process name
pkill -f "react-scripts start" 2>/dev/null || true
sleep 1

echo "✅ Previous server stopped"
echo ""

# Navigate to frontend directory
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend

echo "2️⃣  Starting React development server..."
echo ""

# Start in foreground so you can see the output
npm start
