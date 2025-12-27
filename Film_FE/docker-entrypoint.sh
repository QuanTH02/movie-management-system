#!/bin/sh
set -e

echo "Checking node_modules and dependencies..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "node_modules not found, installing all dependencies..."
  npm install --no-audit
else
  # Verify critical packages are installed
  MISSING_PACKAGES=""
  for pkg in react react-dom next recharts swr; do
    if ! npm list "$pkg" >/dev/null 2>&1; then
      MISSING_PACKAGES="$MISSING_PACKAGES $pkg"
    fi
  done

  if [ -n "$MISSING_PACKAGES" ]; then
    echo "Missing packages detected: $MISSING_PACKAGES"
    echo "Installing missing dependencies..."
    npm install --no-audit
  else
    echo "All critical dependencies are installed."
  fi
fi

echo "Dependencies check completed."
echo "Starting Next.js dev server..."
exec "$@"
