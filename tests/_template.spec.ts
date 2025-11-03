import { test, expect } from '@playwright/test';
import { dismissOverlays, searchInput, assertCoreStructure } from './utils/guardrails';

// Template test demonstrating the guardrails usage
// Replace URL and flow specifics per site under test

test('Template: basic search flow', async ({ page }) => {
  await page.goto('https://example.com');

  await dismissOverlays(page);
  await assertCoreStructure(page);

  const input = await searchInput(page);
  await expect(input).toBeVisible();
  await input.fill('demo');
  await input.press('Enter');

  await expect(page).toHaveURL(/search|results/i);
});