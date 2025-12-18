# Pre-commit Hooks - Tóm tắt

## ✅ Đã setup

### Frontend (Husky + lint-staged)
- ✅ **Husky** - Git hooks manager
- ✅ **lint-staged** - Chỉ check files đã staged
- ✅ **ESLint** - Lint TypeScript/JavaScript
- ✅ **Prettier** - Format code
- ✅ **TypeScript** - Type checking

### Backend (Pre-commit framework)
- ✅ **pre-commit** - Git hooks framework
- ✅ **Black** - Format Python code
- ✅ **isort** - Sort imports
- ✅ **flake8** - Lint Python code

## 📁 Files đã tạo

### Root
- `.pre-commit-config.yaml` - Pre-commit configuration
- `README_PRE_COMMIT.md` - Full documentation
- `QUICK_START_PRE_COMMIT.md` - Quick start guide
- `scripts/setup-pre-commit.sh` - Setup script
- `scripts/pre-commit-check.sh` - Manual check script

### Frontend
- `Film_FE/.husky/pre-commit` - Pre-commit hook
- `Film_FE/.husky/pre-push` - Pre-push hook (optional)
- `Film_FE/.lintstagedrc.js` - Lint-staged config
- `Film_FE/.husky/_/husky.sh` - Husky helper

### Backend
- `Film_BE/.flake8` - Flake8 configuration
- `Film_BE/pyproject.toml` - Black & isort config

## 🚀 Cách sử dụng

### Setup (một lần)
```bash
./scripts/setup-pre-commit.sh
```

### Commit (tự động)
```bash
git add .
git commit -m "Your message"
# Hooks tự động chạy!
```

### Chạy thủ công
```bash
# Frontend
cd Film_FE
npm run lint:fix
npm run format
npm run type-check

# Backend
cd Film_BE
black .
isort .
flake8 .
```

## ⚙️ Cấu hình

Hooks sẽ tự động:
1. Format code (Prettier cho FE, Black cho BE)
2. Sort imports (isort cho BE)
3. Lint code (ESLint cho FE, flake8 cho BE)
4. Type check (TypeScript cho FE)

## 🔧 Troubleshooting

Nếu hooks không chạy:
```bash
# Reinstall
cd Film_FE && npm run prepare
pre-commit install --overwrite
```

Bỏ qua hooks (không khuyến khích):
```bash
git commit --no-verify -m "Skip hooks"
```
