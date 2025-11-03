import { test, expect } from '@playwright/test';

// Demo-focused: brief pauses for visibility in headed mode
// Resilient selectors with role/testId fallbacks

test.describe('Popular movies flow', () => {
  test('opens first popular movie and validates details', async ({ page }) => {
    // Navigate to Popular category page
    await page.goto('https://debs-obrien.github.io/playwright-movies-app?category=Popular&page=1');

    // Verify the page heading indicates Popular
    const pageH1 = page.getByRole('heading', { level: 1 });
    await expect(pageH1).toBeVisible();
    await expect(pageH1).toContainText(/popular/i);

    // Demo pause: let you see the listing
    await page.waitForTimeout(1500);

    // Locate the movies list/grid (use resilient fallback)
    const moviesList = page
      .getByRole('list', { name: /movies/i })
      .or(page.locator('[data-testid="movies-list"], main ul, main ol'));

    await expect(moviesList).toBeVisible();

    // Get the first movie card link and read its title (usually an h2 inside the card)
    const firstCardLink = moviesList.getByRole('link').first();
    const cardTitleEl = firstCardLink.getByRole('heading', { level: 2 }).or(firstCardLink.locator('h2'));
    const cardTitle = (await cardTitleEl.textContent())?.trim() || '';

    // Demo pause: let you see the first card selected
    await page.waitForTimeout(1000);

    // Click through to the movie details page
    await firstCardLink.click();

    // We should be on details page; verify the main h1 contains the card title
    const detailsH1 = page.getByRole('heading', { level: 1 });
    await expect(detailsH1).toBeVisible();
    if (cardTitle) {
      await expect(detailsH1).toContainText(new RegExp(cardTitle, 'i'));
    }

    // Verify key sections on the details page
    await expect(page.getByText('The Synopsis', { exact: false })).toBeVisible();
    await expect(page.getByText('The Cast', { exact: false })).toBeVisible();

    // Recommended movies section (heading may be role-based)
    const recommendedHeading = page
      .getByRole('heading', { name: /recommended movies/i })
      .or(page.getByText(/recommended movies/i));

    await expect(recommendedHeading).toBeVisible();

    // Demo pause: let you see the details state
    await page.waitForTimeout(1500);

    // Navigate back: prefer browser back to restore listing state
    await page.goBack();

    // Verify we are back on the Popular page (URL + heading)
    await expect(page).toHaveURL(/category=Popular/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/popular/i);
  });
});