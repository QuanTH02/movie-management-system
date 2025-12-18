#!/bin/bash
# Script to run Django tests with proper environment setup

set -e

echo "Running Django tests..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Set Django settings
export DJANGO_SETTINGS_MODULE=Film_BE.settings

# Run pytest with coverage
pytest --cov=App_Film_BE --cov-report=html --cov-report=term-missing -v

echo "Tests completed. Coverage report generated in htmlcov/"

