# OctoFit Tracker Frontend Configuration

## Environment Variables Setup

The frontend uses environment variables to connect to the Django REST API backend.

### For GitHub Codespaces:

Edit the `.env` file in the `octofit-tracker/frontend/` directory:

```env
REACT_APP_CODESPACE_NAME=your-codespace-name
REACT_APP_API_PROTOCOL=https
REACT_APP_API_PORT=8000
```

Replace `your-codespace-name` with your actual GitHub Codespaces name.

### For Local Development:

The default `.env` file is already configured for local development:

```env
REACT_APP_CODESPACE_NAME=localhost
REACT_APP_API_PROTOCOL=http
REACT_APP_API_PORT=8000
```

## Available Components

- **Users** - Displays a list of all users
- **Activities** - Shows available activities
- **Workouts** - Lists all logged workouts
- **Teams** - Displays team information
- **Leaderboard** - Competitive ranking system

## API Endpoints

The frontend will attempt to fetch data from the following endpoints:

- `https://{CODESPACE_NAME}-8000.app.github.dev/api/users/`
- `https://{CODESPACE_NAME}-8000.app.github.dev/api/activities/`
- `https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
- `https://{CODESPACE_NAME}-8000.app.github.dev/api/teams/`
- `https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

Or for localhost:

- `http://localhost:8000/api/users/`
- `http://localhost:8000/api/activities/`
- `http://localhost:8000/api/workouts/`
- `http://localhost:8000/api/teams/`
- `http://localhost:8000/api/leaderboard/`

## Browser Console

Open the browser's Developer Tools (F12) and check the Console tab to see:

- API Base URL being used
- Environment variables
- Fetched data from each endpoint
- Any errors encountered

## Running the Frontend

```bash
cd octofit-tracker/frontend
npm start
```

The app will open at `http://localhost:3000`
