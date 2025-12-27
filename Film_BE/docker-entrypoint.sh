#!/bin/sh
set -e

echo "Checking Python dependencies..."

# Check if requirements.txt exists
if [ ! -f "requirements.txt" ]; then
  echo "Warning: requirements.txt not found"
  exec "$@"
fi

# Convert requirements.txt to UTF-8 if needed (handle UTF-16 encoding issues)
python3 << 'PYEOF'
import sys
try:
    with open('requirements.txt', 'rb') as f:
        data = f.read()

    # Check BOM and decode appropriately
    if data.startswith(b'\xff\xfe'):
        # UTF-16 LE BOM
        text = data[2:].decode('utf-16-le')
    elif data.startswith(b'\xfe\xff'):
        # UTF-16 BE BOM
        text = data[2:].decode('utf-16-be')
    else:
        try:
            text = data.decode('utf-8')
        except UnicodeDecodeError:
            # Try UTF-16 LE without BOM
            text = data.decode('utf-16-le')

    # Write as UTF-8
    with open('requirements_utf8.txt', 'w', encoding='utf-8', newline='\n') as out:
        out.write(text)
    print("Converted requirements.txt to UTF-8")
except Exception as e:
    print(f"Warning: Could not convert requirements.txt: {e}")
    import shutil
    shutil.copy('requirements.txt', 'requirements_utf8.txt')
PYEOF

# Use converted file if it exists, otherwise use original
REQ_FILE="requirements.txt"
if [ -f "requirements_utf8.txt" ]; then
    REQ_FILE="requirements_utf8.txt"
fi

# Install/update dependencies from requirements.txt
echo "Installing/updating dependencies from $REQ_FILE..."
pip install --no-cache-dir -r "$REQ_FILE"

# Verify critical packages are installed
echo "Verifying critical packages..."
python3 -c "import django; import rest_framework; import rest_framework_simplejwt; print('All critical packages verified')" 2>/dev/null || {
  echo "Some packages missing, reinstalling..."
  pip install --no-cache-dir -r "$REQ_FILE"
}

echo "Dependencies check completed."
exec "$@"
