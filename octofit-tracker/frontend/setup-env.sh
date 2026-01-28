#!/bin/bash

# Setup environment variables for OctoFit Tracker Frontend

ENV_FILE="/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend/.env"

# Check if running in GitHub Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "Detected GitHub Codespaces environment: $CODESPACE_NAME"
    
    # Create .env file for Codespaces
    cat > "$ENV_FILE" << EOF
# OctoFit Tracker React Environment Variables
# Auto-generated for GitHub Codespaces

REACT_APP_CODESPACE_NAME=$CODESPACE_NAME
REACT_APP_API_PROTOCOL=https
REACT_APP_API_PORT=8000
EOF
    
    echo "✅ .env file configured for Codespaces"
    echo "API URL will be: https://$CODESPACE_NAME-8000.app.github.dev"
else
    echo "Detected local development environment"
    
    # Create .env file for local development
    cat > "$ENV_FILE" << EOF
# OctoFit Tracker React Environment Variables
# Configured for local development

REACT_APP_CODESPACE_NAME=localhost
REACT_APP_API_PROTOCOL=http
REACT_APP_API_PORT=8000
EOF
    
    echo "✅ .env file configured for localhost"
    echo "API URL will be: http://localhost:8000"
fi

echo ""
echo "Environment file created at: $ENV_FILE"
cat "$ENV_FILE"
