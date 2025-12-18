# Frontend Testing Guide

## Quick Start

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run all tests (unit + E2E)
npm run test:all
```

## Test Types

### 1. Unit Tests (Jest + React Testing Library)
- Component rendering
- User interactions
- Hooks
- Utilities

### 2. Integration Tests
- Component interactions
- API calls with MSW
- State management

### 3. E2E Tests (Playwright)
- Full user flows
- Cross-browser testing
- Real browser interactions

## Writing Tests

### Component Test Example
```typescript
import { render, screen } from '../setup/test-utils';
import userEvent from '@testing-library/user-event';

test('renders and handles click', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(screen.getByText('Clicked!')).toBeInTheDocument();
});
```

### Hook Test Example
```typescript
import { renderHook, waitFor } from '@testing-library/react';

test('hook returns data', async () => {
  const { result } = renderHook(() => useMyHook());
  
  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="username"]', 'testuser');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/');
});
```

## Test Utilities

- `test/setup/test-utils.tsx` - Custom render with providers
- `test/setup/msw-handlers.ts` - API mock handlers
- `test/setup/msw-server.ts` - MSW server setup

## Best Practices

1. Test user behavior, not implementation
2. Use `data-testid` for stable selectors
3. Mock external APIs with MSW
4. Keep tests isolated and independent
5. Write descriptive test names

