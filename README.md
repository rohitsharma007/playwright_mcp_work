# PMCP Playwright Project

Automated UI tests built with Playwright (TypeScript) to explore and validate key user flows across public sites (e.g., Flipkart, YouTube, IMDb, DemoQA). Tests use accessibility-first locators, resilient fallbacks, and Playwright tracing for reliable debugging.

## Repository Structure
- `.github/`
  - `generate_tests.prompt.md` — guidance to consistently generate tests: navigate, explore key functionality, implement a Playwright TypeScript test, run with trace, iterate until passing.
- `.vscode/`
  - `mcp.json`, `settings.json` — editor configuration and integration settings.
- `docs/`
  - `testing-guardrails.md` — standard operating procedures, locator strategies, overlay handling, and running/trace review commands.
- `tests/`
  - `flipkart-home.spec.ts` — homepage smoke test for Flipkart; validates core structure and linked tiles. Planned to align with guardrails.
  - `flipkart-search.spec.ts` — Flipkart search flow; dismisses overlay, finds search box via guardrails, asserts results and product tiles. Passing with trace.
  - `imdb-search.spec.ts` — IMDb search flow (pattern similar to other search tests).
  - `popular-flow.spec.ts` — Example of a broader user journey or combined smoke checks (site-specific).
  - `smoke-home.spec.ts` — Generic homepage smoke test example (validate landmarks/tiles).
  - `youtube-search.spec.ts` — YouTube search flow (pattern similar to Flipkart/IMDb).
  - `_template.spec.ts` — reusable template showing how to apply guardrails in a basic search test; copy and adapt per site.
  - `fixtures/`
    - `sample.txt` — sample fixture file for tests that read from disk.
  - `utils/guardrails.ts` — shared helpers:
    - `dismissOverlays(page)` — closes known modal overlays and backdrops.
    - `searchInput(page)` — resilient search locator (role → placeholder → generic input).
    - `assertCoreStructure(page)` — verifies visible `header`, `main`, `footer`, or `#container`.
- `test-results/`
  - Per-test run artifacts; folders include screenshots, videos, and `trace.zip` archives.
  - `.last-run.json` — metadata for the most recent test execution.
- `playwright.config.ts` — Playwright configuration (project settings, reporter/timeouts, etc.).
- `package.json` / `package-lock.json` — dependencies and scripts.

## How Files Connect (End-to-End Flow)
- Authoring:
  - Use `.github/generate_tests.prompt.md` as the checklist to create new tests.
  - Start from `tests/_template.spec.ts` to quickly scaffold a new spec.
  - Import guardrails from `tests/utils/guardrails.ts` to standardize overlay handling, core structure assertions, and resilient locators.
- Execution:
  - Run tests via `npx playwright test` and enable tracing for debugging.
  - Tests produce artifacts under `test-results/` with a `trace.zip` for each run.
- Debugging:
  - Open traces using `npx playwright show-trace <trace.zip> --port <port>`.
  - Inspect actions, assertions, DOM snapshots; iterate on selectors based on evidence.
- Configuration:
  - `playwright.config.ts` applies global settings (e.g., projects/browsers, timeouts, reporter). CLI flags like `--headed` and `--trace=on` complement the config.

## Standard Testing Flow (SOP)
1. Navigate and explore the target site in a headed browser.
2. Close overlays and confirm a single key functionality (e.g., search, product tiles).
3. Close exploration, implement a focused Playwright test in `tests/` using TypeScript.
4. Prefer `getByRole`/`getByLabel`/`getByPlaceholder`; rely on Playwright auto-waiting.
5. Run with `--trace=on`; iterate until the test passes.
6. Review the trace to validate actions and DOM; adjust selectors if needed.

## Commands
- Run a specific test headed with trace:
  - `npx playwright test tests/flipkart-search.spec.ts --headed --trace=on`
- Run all tests:
  - `npx playwright test`
- Open a trace:
  - `npx playwright show-trace test-results/<run-folder>/trace.zip --port 9360`

## Adding New Tests
- Copy `tests/_template.spec.ts` and adapt the URL and flow.
- Import and call `dismissOverlays(page)`, `assertCoreStructure(page)`, and `searchInput(page)`.
- Focus on one meaningful assertion of the flow’s success (e.g., URL change, visible results/tiles).

## Conventions
- Keep tests small, descriptive, and site-focused.
- Use accessibility-first selectors with resilient fallbacks.
- Avoid arbitrary timeouts; leverage Playwright’s auto-wait.
- Validate navigation via `expect(page).toHaveURL(...)` and core structure visibility.

## Notes on Current Tests
- `flipkart-search.spec.ts` passes and includes a `trace.zip` under `test-results/flipkart-search-Flipkart-s-3b9bc-hes-and-shows-product-tiles-chromium/`.
- `flipkart-home.spec.ts` can be refactored to use `guardrails.ts` for robustness (overlay dismissal and improved search locator).

---
This README serves as the central reference for how the project’s folders, files, and execution flow connect. Use the guardrails to keep new tests consistent, resilient, and easy to debug with Playwright traces.