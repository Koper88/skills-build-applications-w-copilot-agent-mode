#!/bin/bash

# Restart Django Server Script
# Stops and restarts the OctoFit Tracker Django backend

echo "🔄 Restarting Django Server"
echo "==========================="
echo ""

# Kill existing Django server processes
echo "1️⃣  Stopping existing Django server..."
pkill -f "manage.py runserver" || echo "   No running server found"
sleep 2

# Check if server is still running
if ps aux | grep -E 'manage.py.*runserver' | grep -v grep > /dev/null; then
    echo "⚠️  Server still running, forcing kill..."
    pkill -9 -f "manage.py runserver"
    sleep 1
fi

echo "✅ Previous server stopped"
echo ""

# Start new server
echo "2️⃣  Starting Django server..."
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend

# Activate virtual environment and start server
source venv/bin/activate

# Start server in background (or foreground if you uncomment the last line)
echo "   Starting on 0.0.0.0:8000..."

# Option 1: Background mode
python manage.py runserver 0.0.0.0:8000 > /tmp/django-server.log 2>&1 &
SERVER_PID=$!

echo "✅ Django server started (PID: $SERVER_PID)"
echo ""

# Wait a moment and check if it's running
sleep 2

if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server is running successfully!"
    echo ""
    echo "📋 Server info:"
    echo "   PID: $SERVER_PID"
    echo "   URL: http://localhost:8000"
    echo "   API: http://localhost:8000/api/"
    echo "   Logs: tail -f /tmp/django-server.log"
    echo ""
    echo "🛑 To stop: kill $SERVER_PID"
else
    echo "❌ Server failed to start. Check logs:"
    echo "   cat /tmp/django-server.log"
fi

# Option 2: Foreground mode (uncomment to use)
# python manage.py runserver 0.0.0.0:8000
