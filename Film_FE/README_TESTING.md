# Testing Guide for Frontend

## Setup

All testing dependencies are installed in package.json. Install them with:

```bash
npm install
```

## Running Tests

### Unit/Component Tests (Jest)
```bash
npm test              # Run all tests
npm run test:watch    # Run in watch mode
npm run test:coverage # Run with coverage report
```

### E2E Tests (Playwright)
```bash
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run with UI mode
npm run test:e2e:debug # Run in debug mode
```

### Run All Tests
```bash
npm run test:all
```

## Test Structure

- `test/` - Unit and integration tests
  - `setup/` - Test utilities and MSW handlers
  - `examples/` - Example test files
- `e2e/` - End-to-end tests (Playwright)

## Available Utilities

### Test Utils (`test/setup/test-utils.tsx`)
- `render()` - Custom render function with providers
- `waitForAsync()` - Helper for async operations
- `createMockResponse()` - Helper for mock fetch responses

### MSW (Mock Service Worker)
- API requests are automatically mocked in tests
- Handlers defined in `test/setup/msw-handlers.ts`
- Server setup in `test/setup/msw-server.ts`

## Example Tests

### Component Test
```typescript
import { render, screen } from '../setup/test-utils';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### E2E Test
```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="username"]', 'testuser');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/');
});
```

