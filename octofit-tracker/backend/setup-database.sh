#!/bin/bash

# Django Database Management Script
# Handles migrations and database setup for OctoFit Tracker

set -e  # Exit on error

BACKEND_DIR="/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend"
VENV_ACTIVATE="$BACKEND_DIR/venv/bin/activate"

echo "🗄️  Django Database Management"
echo "=============================="
echo ""

# Check if virtual environment exists
if [ ! -f "$VENV_ACTIVATE" ]; then
    echo "❌ Virtual environment not found at: $VENV_ACTIVATE"
    echo "   Please create it first with: python3 -m venv $BACKEND_DIR/venv"
    exit 1
fi

# Activate virtual environment
echo "1️⃣  Activating virtual environment..."
source "$VENV_ACTIVATE"
echo "✅ Virtual environment activated"
echo ""

# Change to backend directory
cd "$BACKEND_DIR"

# Run migrations
echo "2️⃣  Running database migrations..."
python manage.py migrate --noinput
echo "✅ Migrations complete"
echo ""

# Check if database has data
echo "3️⃣  Checking database contents..."
echo ""

# Count records in each model
echo "📊 Current database state:"
python manage.py shell -c "
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

models = [
    ('Users', User),
    ('Teams', Team),
    ('Activities', Activity),
    ('Leaderboard', Leaderboard),
    ('Workouts', Workout),
]

for name, model in models:
    count = model.objects.count()
    print(f'   {name}: {count} records')
"
echo ""

# Ask if user wants to populate with sample data
echo "4️⃣  Sample data population..."
read -p "Do you want to populate with sample data? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -f "octofit_tracker/management/commands/populate_db.py" ]; then
        echo "   Loading sample data..."
        python manage.py populate_db
        echo "✅ Sample data loaded"
    else
        echo "⚠️  populate_db command not found"
        echo "   You can manually create data through Django admin or API"
    fi
else
    echo "⏭️  Skipping sample data population"
fi

echo ""
echo "✨ Database setup complete!"
echo ""
echo "🚀 Next steps:"
echo "   1. Start Django server: python manage.py runserver 0.0.0.0:8000"
echo "   2. Access API at: http://localhost:8000/api/"
echo "   3. Admin panel: http://localhost:8000/admin/"
