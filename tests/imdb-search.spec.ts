import { test, expect } from '@playwright/test';

// Demo-focused test: brief pauses so you can watch steps in headed mode
// Note: waits are for demo visibility only; not needed for robust tests

test.describe('IMDb search: Kantara flow', () => {
  test('searches for "kantara" and opens the title page', async ({ page }) => {
    await page.goto('https://www.imdb.com/');

    const searchInput = page
      .getByRole('textbox', { name: /search imdb/i })
      .or(page.getByPlaceholder(/search imdb/i))
      .or(page.locator('input[name="q"]'));

    await searchInput.click();
    await searchInput.fill('kantara');

    // Demo pause: let you see the typed value
    await page.waitForTimeout(2000);

    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/find\/\?q=kantara/i);

    // Demo pause: let you see the results list
    await page.waitForTimeout(2000);

    // Target the Titles block to avoid clicking non-title links
    const titlesBlock = page.getByTestId('find-title-results');

    const kantaraLink = titlesBlock
      .getByRole('link', { name: /kantara/i })
      .first()
      .or(titlesBlock.locator('a[href*="/title/"]', { hasText: /kantara/i }).first())
      .or(page.locator('a[href*="/title/"]', { hasText: /kantara/i }).first());

    await expect(kantaraLink).toBeVisible();
    await kantaraLink.click();

    await expect(page).toHaveURL(/\/title\/tt/i);

    const heroTitle = page
      .getByTestId('hero-title-block__title')
      .or(page.getByRole('heading', { level: 1 }));

    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText(/kantara/i);
  });
});