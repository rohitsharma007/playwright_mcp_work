# Testing Guardrails (Playwright)

These guardrails codify the standard workflow and locator strategy to keep tests reliable and fast.

## SOP Workflow
- Navigate: Open the target URL (headed for exploration).
- Explore: Validate one key flow (e.g., search, listing) and close overlays.
- Close exploration: Shut the headed browser before writing/running tests.
- Implement: Write tests under `tests/` using `@playwright/test`.
- Execute & iterate: Run with `--trace=on`, fix selectors, iterate until passing.
- Verify: Open the trace viewer, confirm actions and DOM snapshots.

## Locator Strategy
- Prefer accessibility-first locators: `getByRole`, `getByLabel`, `getByPlaceholder`.
- Resilient search input fallback chain:
  1. `getByRole('textbox').first()`
  2. `locator('input[placeholder*="Search" i]').first()`
  3. `locator('input[type="text"], textarea').first()`
- Product tiles: assert visible tile containers and linked images rather than brittle hrefs.

## Overlay Handling
- Use `dismissOverlays(page)` from `tests/utils/guardrails.ts`.
- Click close buttons: names like `✕`, `close`, `dismiss`, `not now`, `cancel`.
- Press `Escape` and remove common backdrops (`.modal-backdrop`, `.backdrop`, `.overlay`).

## Core Assertions
- `expect(page).toHaveURL(...)` for navigation guarantees.
- `assertCoreStructure(page)` checks `header`, `main`, `footer`, or `#container` visibility.
- Validate at least one meaningful UI element (e.g., product tiles).

## Template
- Use `tests/_template.spec.ts` to bootstrap new tests quickly.
- Replace the URL and flow specifics; keep guardrails calls and assertions.

## Run
- Example: `npx playwright test tests/flipkart-search.spec.ts --headed --trace=on`
- Open trace viewer: `npx playwright show-trace <trace.zip>`

## Notes
- Avoid custom timeouts; rely on Playwright auto-waiting.
- Keep tests descriptive, small, and aligned with the prompt’s steps.