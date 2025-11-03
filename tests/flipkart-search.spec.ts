import { test, expect } from '@playwright/test';
import { dismissOverlays, searchInput, assertCoreStructure } from './utils/guardrails';

test('Flipkart search explores and shows product tiles', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  await dismissOverlays(page);
  await assertCoreStructure(page);

  const input = await searchInput(page);
  await expect(input).toBeVisible();
  await input.fill('iphone');
  await input.press('Enter');

  await expect(page).toHaveURL(/\/search/i);

  const tiles = page.getByRole('link').filter({ has: page.locator('img') });
  await expect(tiles.first()).toBeVisible();
});