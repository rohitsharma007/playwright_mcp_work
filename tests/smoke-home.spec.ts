import { test, expect } from '@playwright/test';

// Basic smoke test to validate the Movies app homepage loads

test.describe('Movies app smoke', () => {
  test('loads homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});