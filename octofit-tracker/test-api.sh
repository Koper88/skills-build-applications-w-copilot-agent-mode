#!/bin/bash

# Test Django API Endpoints
# This script tests all OctoFit Tracker API endpoints

echo "🧪 Testing OctoFit Tracker API Endpoints"
echo "========================================"
echo ""

BASE_URL="http://localhost:8000"

# Check if server is running
echo "1️⃣  Checking if Django server is running..."
if ps aux | grep -E 'manage.py.*runserver' | grep -v grep > /dev/null; then
    echo "✅ Django server is running"
else
    echo "❌ Django server is NOT running"
    echo "   Start it with: cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend && source venv/bin/activate && python manage.py runserver 0.0.0.0:8000"
    exit 1
fi

echo ""
echo "2️⃣  Testing API endpoints..."
echo ""

# Test each endpoint
endpoints=("users" "activities" "leaderboard" "teams" "workouts")

for endpoint in "${endpoints[@]}"; do
    url="${BASE_URL}/api/${endpoint}/"
    echo -n "Testing /${endpoint}/... "
    
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$http_code" = "200" ]; then
        echo "✅ OK (HTTP $http_code)"
        
        # Get count of items
        count=$(curl -s "$url" | python3 -c "import sys, json; data = json.load(sys.stdin); print(len(data.get('results', data)))" 2>/dev/null || echo "?")
        echo "   └─ Items: $count"
    else
        echo "❌ FAILED (HTTP $http_code)"
    fi
done

echo ""
echo "3️⃣  Testing API root..."
http_code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api/")
if [ "$http_code" = "200" ]; then
    echo "✅ API root OK (HTTP $http_code)"
else
    echo "❌ API root FAILED (HTTP $http_code)"
fi

echo ""
echo "✨ Test complete!"
echo ""
echo "📝 View detailed response:"
echo "   curl http://localhost:8000/api/users/ | python3 -m json.tool"
