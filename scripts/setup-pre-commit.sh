#!/bin/bash
# Setup script for pre-commit hooks
# Run this once after cloning the repository

set -e

echo "🔧 Setting up pre-commit hooks..."

# Setup Frontend (Husky)
echo "📦 Setting up Frontend hooks (Husky)..."
cd Film_FE
if [ ! -d "node_modules" ]; then
  echo "  Installing npm dependencies..."
  npm install
else
  echo "  npm dependencies already installed"
fi

echo "  Initializing Husky..."
npm run prepare || npx husky install || echo "  Husky already initialized"

cd ..

# Setup Backend (Pre-commit)
echo "🐍 Setting up Backend hooks (Pre-commit)..."
if command -v pre-commit >/dev/null 2>&1; then
  echo "  Pre-commit already installed"
elif [ -f ~/.local/bin/pre-commit ]; then
  echo "  Using pre-commit from ~/.local/bin/"
  ~/.local/bin/pre-commit install
else
  echo "  Installing pre-commit..."
  pip install pre-commit black flake8 isort
  pre-commit install
fi

echo ""
echo "✅ Pre-commit hooks setup completed!"
echo ""
echo "To test, try:"
echo "  git add ."
echo "  git commit -m 'Test commit'"
echo ""
echo "Hooks will automatically run on commit."
