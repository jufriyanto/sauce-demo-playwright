# SauceDemo — Playwright E2E Automation Portfolio

[![Playwright Tests](https://github.com/jufriyanto/sauce-demo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/jufriyanto/sauce-demo-playwright/actions/workflows/playwright.yml)

End-to-end test automation portfolio project built with **Playwright + TypeScript + BDD**, covering UI and API testing for [saucedemo.com](https://www.saucedemo.com).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test code |
| [playwright-bdd](https://vitalets.github.io/playwright-bdd) | Gherkin BDD layer on top of Playwright |
| [Allure Report](https://allurereport.org) | Visual test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## Architecture

```
features/**/*.feature       ← Gherkin scenarios (business language)
        ↓  bddgen
.features-gen/**/*.spec.ts  ← Auto-generated test files (do not edit)
        ↓  playwright test
steps/**/*.ts               ← Step definitions
pages/**/*.ts               ← Page Object Model
fixtures/index.ts           ← Custom Playwright fixtures
```

**Layers:**
- **features/** — Gherkin `.feature` files organized by module
- **steps/** — Step definitions using `createBdd()` from playwright-bdd
- **pages/** — Page Object Model; all classes extend `BasePage`
- **fixtures/** — Custom `test.extend()` fixtures (e.g., `authenticatedPage`)

---

## Test Coverage — 46 Scenarios

| Module | Scenarios | What's Tested |
|---|---|---|
| Login | 6 | Valid login, invalid username/password, empty fields, locked-out user |
| Logout | 2 | Successful logout, redirect after logout |
| Products | 11 | Product list, sorting (4 options), detail page, add/remove from cart, price display |
| Cart | 5 | Add item, remove item, empty cart, cart badge count, continue shopping |
| Checkout | 11 | Complete flow, field validation (3 fields), item total, tax, grand total, cancel |
| Burger Menu | 4 | All Items, About, Reset App State, close menu |
| API | 5 | GET list, GET single, POST create, PUT update, DELETE (via reqres.in) |
| Fixture Demo | 2 | Auth via custom fixture — no Background login step needed |

---

## Key Patterns

### Page Object Model
All page interactions are encapsulated in page classes. Steps instantiate page objects inline — no DI framework needed.

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
```

### BDD with Gherkin
Scenarios are written in plain English, readable by non-technical stakeholders.

```gherkin
Scenario: Complete checkout successfully
  Given I am logged in as "standard_user"
  When I add "Sauce Labs Backpack" to the cart
  And I proceed to checkout
  And I fill checkout info with "John", "Doe", and "12345"
  And I finish the order
  Then I should see the order confirmation "Thank you for your order!"
```

### Custom Fixtures
`authenticatedPage` fixture handles login automatically via `test.extend()`. Scenarios that use it don't need a Background login step.

```typescript
// fixtures/index.ts
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await new LoginPage(page).goto();
    await new LoginPage(page).login('standard_user', 'secret_sauce');
    await use(page);  // page is now logged in
  },
});
```

```gherkin
# No Background needed — fixture handles auth
Scenario: Add item to cart with fixture auth
  Given I am on the products page as an authenticated user
  When I add "Sauce Labs Backpack" to the cart
  Then the cart badge should show "1"
```

### API Testing
API scenarios run alongside UI tests using Playwright's built-in `request` context.

```gherkin
Scenario: POST create user returns status 201
  When I send a POST request to "/api/users" with name "John" and job "SDET"
  Then the response status should be 201
  And the response should contain name "John"
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Java 8+ (required by Allure CLI)

### Install

```bash
npm ci
npx playwright install chromium
```

### Run Tests

```bash
# Run all 46 tests
npm test

# Run specific feature
npx bddgen && npx playwright test --grep "Checkout"

# Run with Playwright UI mode
npm run test:ui
```

### Reports

```bash
# Open Playwright HTML report
npm run report

# Generate and open Allure report
npm run report:allure
```

---

## CI/CD

Tests run automatically on every push to `main` via GitHub Actions.

**Pipeline steps:**
1. Install dependencies
2. Install Chromium browser
3. Run 46 tests (`npm test`)
4. Generate Allure Report
5. Upload Allure Report + HTML Report as artifacts (retained 14 days)

View latest run: [GitHub Actions](https://github.com/jufriyanto/sauce-demo-playwright/actions)
