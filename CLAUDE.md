# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CI

Tests run automatically on every push to `main` via GitHub Actions (`.github/workflows/playwright.yml`). Results and HTML report are uploaded as artifacts after each run.

## Commands

```bash
# Run all tests (generates BDD specs first, then runs Playwright)
npm test

# Run a single feature file
npx bddgen && npx playwright test --grep "Login"

# Run tests with Playwright UI mode
npm run test:ui

# Open HTML report after test run
npm run report
```

`npm test` runs `bddgen` (pre-step) then `playwright test`. Never run `playwright test` directly without `bddgen` first — it generates the `.features-gen/` files that Playwright actually executes.

## Architecture

This project uses **playwright-bdd**: Gherkin `.feature` files are compiled by `bddgen` into TypeScript test files in `.features-gen/`, which Playwright then runs. The compiled files are auto-generated — never edit them manually.

### Data flow

```
features/**/*.feature
        ↓  bddgen
.features-gen/**/*.spec.ts
        ↓  playwright test
steps/**/*.ts  ←→  pages/**/*.ts
```

### Layers

**features/** — Gherkin scenarios only. Each module has its own subfolder (`login/`, `logout/`, `products/`, `cart/`, `checkout/`, `menu/`). Scenarios reuse steps across files freely.

**steps/** — Step definitions using `createBdd()` from `playwright-bdd`. Each file corresponds to a feature module. Steps receive `{ page }` directly from Playwright fixtures — no custom fixture setup needed. Steps that are shared across modules (e.g., `I am logged in as`, `I should see {string} as the page title`) live in whichever steps file first defined them; they are globally available.

**pages/** — Page Object Model. All page classes extend `BasePage` which holds the `page` instance. Page objects encapsulate all selectors and interactions; steps instantiate page objects inline (no dependency injection).

### Config

- `baseURL`: `https://www.saucedemo.com` — all `page.goto()` calls use relative paths
- Tests run sequentially (`workers: 1`, `fullyParallel: false`) to avoid shared state issues on the demo site
- `retries: 1` handles transient network flakiness
- Screenshots and video are captured only on failure

### Key conventions

- Step parameters use Cucumber expressions (`{string}`, `{int}`)
- Page object methods are `async` and return typed values
- The `I am logged in as {string}` step (in `CartSteps.ts`) is the shared login Background step used by all authenticated feature files — password is always `secret_sauce`
