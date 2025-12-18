#!/bin/bash
# Pre-commit check script for both FE and BE
# This script is called by git hooks

set -e

echo "🔍 Running pre-commit checks..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# Check if there are any staged files
if [ -z "$STAGED_FILES" ]; then
  echo "No staged files to check."
  exit 0
fi

# Check Frontend files
FE_FILES=$(echo "$STAGED_FILES" | grep -E '^Film_FE/.*\.(ts|tsx|js|jsx|json)$' || true)
if [ -n "$FE_FILES" ]; then
  echo "📦 Checking Frontend files..."
  cd Film_FE

  # Run ESLint
  if echo "$FE_FILES" | grep -qE '\.(ts|tsx|js|jsx)$'; then
    echo "  Running ESLint..."
    npm run lint:fix || exit 1
  fi

  # Run Prettier
  echo "  Running Prettier..."
  npm run format || exit 1

  # Type check
  echo "  Running TypeScript check..."
  npm run type-check || exit 1

  cd ..
fi

# Check Backend files
BE_FILES=$(echo "$STAGED_FILES" | grep -E '^Film_BE/.*\.py$' || true)
if [ -n "$BE_FILES" ]; then
  echo "🐍 Checking Backend files..."
  cd Film_BE

  # Run Black (formatting)
  echo "  Running Black (formatting)..."
  black --check . || black . || exit 1

  # Run isort (import sorting)
  echo "  Running isort (import sorting)..."
  isort --check-only . || isort . || exit 1

  # Run flake8 (linting)
  echo "  Running flake8 (linting)..."
  flake8 . || exit 1

  cd ..
fi

echo "✅ All pre-commit checks passed!"
exit 0
