/**
 * Example E2E test using Playwright.
 * This demonstrates how to test the application from a user's perspective.
 */
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display movies', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"], .movie-card, img', {
      timeout: 10000,
    });

    // Check if page title is correct
    await expect(page).toHaveTitle(/HYF Movie/i);

    // Check if movies are displayed
    const movieCards = await page.locator('[data-testid="movie-card"], .movie-card').count();
    expect(movieCards).toBeGreaterThan(0);
  });

  test('should navigate to movie detail page', async ({ page }) => {
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"], .movie-card', {
      timeout: 10000,
    });

    // Click on first movie
    const firstMovie = page.locator('[data-testid="movie-card"], .movie-card').first();
    await firstMovie.click();

    // Should navigate to detail page
    await expect(page).toHaveURL(/\/detail/);
  });

  test('should handle login flow', async ({ page }) => {
    await page.goto('/login');

    // Fill in login form
    await page.fill('input[name="username"], input[type="text"]', 'testuser');
    await page.fill('input[name="password"], input[type="password"]', 'testpass');

    // Submit form
    await page.click('button[type="submit"], button:has-text("Login")');

    // Should redirect to home page after successful login
    await expect(page).toHaveURL('/', { timeout: 5000 });
  });
});

