# Quick Start: Pre-commit Hooks

## Setup (Chạy một lần)

```bash
# Tự động setup tất cả
./scripts/setup-pre-commit.sh

# Hoặc setup thủ công:

# Frontend
cd Film_FE
npm install
npm run prepare

# Backend
pip install pre-commit black flake8 isort
pre-commit install
```

## Sử dụng

Hooks sẽ tự động chạy khi bạn commit:

```bash
git add .
git commit -m "Your message"
# Hooks tự động chạy và format/lint code
```

## Kiểm tra thủ công

### Frontend
```bash
cd Film_FE
npm run lint:fix    # Fix linting
npm run format      # Format code
npm run type-check  # Check types
```

### Backend
```bash
cd Film_BE
black .             # Format code
isort .             # Sort imports
flake8 .            # Lint code
```

## Bỏ qua hooks (Không khuyến khích)

```bash
git commit --no-verify -m "Skip hooks"
```

## Troubleshooting

Nếu hooks không chạy:
```bash
# Reinstall
cd Film_FE && npm run prepare
pre-commit install --overwrite
```
