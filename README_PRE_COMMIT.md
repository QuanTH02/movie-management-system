# Pre-commit Hooks Setup

## Overview

Pre-commit hooks đã được setup để tự động check code trước khi commit:

### Frontend (Next.js/React)
- ✅ ESLint - Lint TypeScript/JavaScript code
- ✅ Prettier - Format code
- ✅ TypeScript - Type checking
- ✅ Lint-staged - Chỉ check files đã staged

### Backend (Django/Python)
- ✅ Black - Format Python code
- ✅ isort - Sort imports
- ✅ flake8 - Lint Python code
- ✅ Pre-commit hooks - Tự động format và lint

## Setup

### 1. Frontend (Husky)
```bash
cd Film_FE
npm install
# Husky sẽ tự động setup khi chạy npm install (nhờ script "prepare")
```

### 2. Backend (Pre-commit)
```bash
# Cài đặt pre-commit (đã có trong requirements hoặc cài global)
pip install pre-commit black flake8 isort

# Install hooks
pre-commit install
```

## Cách sử dụng

### Tự động (Khi commit)
```bash
git add .
git commit -m "Your message"
# Hooks sẽ tự động chạy và format/lint code
```

### Chạy thủ công

#### Frontend
```bash
cd Film_FE
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run type-check    # Check TypeScript
```

#### Backend
```bash
cd Film_BE
black .               # Format code
isort .               # Sort imports
flake8 .              # Lint code
```

#### Chạy tất cả hooks
```bash
# Từ root directory
pre-commit run --all-files
```

## Bỏ qua hooks (Không khuyến khích)

Nếu cần bỏ qua hooks trong một lần commit:
```bash
git commit --no-verify -m "Your message"
```

## Cấu hình

### Frontend
- `.lintstagedrc.js` - Cấu hình lint-staged
- `.husky/pre-commit` - Pre-commit hook script
- `.husky/pre-push` - Pre-push hook script (optional)

### Backend
- `.pre-commit-config.yaml` - Pre-commit configuration
- `Film_BE/.flake8` - Flake8 configuration
- `Film_BE/pyproject.toml` - Black và isort configuration

## Troubleshooting

### Hooks không chạy
```bash
# Reinstall hooks
cd Film_FE && npm run prepare
cd .. && pre-commit install --overwrite
```

### Lỗi format
```bash
# Tự động fix
cd Film_FE && npm run format
cd Film_BE && black . && isort .
```

### Skip một hook cụ thể
Sửa `.pre-commit-config.yaml` và comment out hook không cần thiết.
