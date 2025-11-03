import { expect, type Locator, type Page } from '@playwright/test';

export async function dismissOverlays(page: Page): Promise<void> {
  const closeButton = page.getByRole('button', { name: /✕|close|dismiss|not now|cancel/i });
  if (await closeButton.count()) {
    await closeButton.first().click({ trial: false });
  }
  await page.keyboard.press('Escape');
  const overlaySelectors = [
    '.modal-backdrop',
    '.backdrop',
    '.overlay',
    '[role="dialog"] + .backdrop',
  ];
  for (const sel of overlaySelectors) {
    const overlay = page.locator(sel).first();
    if (await overlay.count()) {
      try {
        await overlay.evaluate((el: Element) => el.remove());
      } catch {}
    }
  }
}

export async function searchInput(page: Page): Promise<Locator> {
  const roleTextbox = page.getByRole('textbox');
  if (await roleTextbox.count()) {
    return roleTextbox.first();
  }
  const byPlaceholder = page.locator('input[placeholder*="Search" i]');
  if (await byPlaceholder.count()) {
    return byPlaceholder.first();
  }
  const genericText = page.locator('input[type="text"], textarea');
  if (await genericText.count()) {
    return genericText.first();
  }
  return page.locator('input, textarea').first();
}

export async function assertCoreStructure(page: Page): Promise<void> {
  const header = page.locator('header');
  const main = page.locator('main');
  const footer = page.locator('footer');
  const container = page.locator('#container');
  if (await header.count()) await expect(header.first()).toBeVisible();
  if (await main.count()) await expect(main.first()).toBeVisible();
  if (await footer.count()) await expect(footer.first()).toBeVisible();
  if (await container.count()) await expect(container.first()).toBeVisible();
}