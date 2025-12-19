#!/bin/sh
set -e

echo "Checking node_modules..."

# Check if node_modules exists and has react-hook-form
if [ ! -d "node_modules" ] || [ ! -d "node_modules/react-hook-form" ]; then
  echo "node_modules missing or incomplete, installing dependencies..."
  npm install
else
  echo "node_modules exists, checking for missing packages..."
  # Check if react-hook-form is installed
  if ! npm list react-hook-form >/dev/null 2>&1; then
    echo "react-hook-form not found, installing dependencies..."
    npm install
  else
    echo "All dependencies are installed."
  fi
fi

echo "Starting Next.js dev server..."
exec "$@"
