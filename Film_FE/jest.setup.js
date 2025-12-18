// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Setup MSW (Mock Service Worker) for API mocking in tests
// Only setup if MSW is available (for environments that support it)
try {
  const { setupServer } = require('msw/node');
  const { handlers } = require('./test/setup/msw-handlers');
  
  const server = setupServer(...handlers);
  
  // Establish API mocking before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests
  afterEach(() => server.resetHandlers());
  
  // Clean up after the tests are finished
  afterAll(() => server.close());
} catch (error) {
  // MSW not available, skip setup
  console.warn('MSW setup skipped:', error.message);
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
