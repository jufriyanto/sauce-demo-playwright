import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

const { When, Then } = createBdd();

When('I logout', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.logout();
});

Then('I should be on the login page', async ({ page }) => {
  await expect(page).toHaveURL('/');
  await expect(page.locator('#login-button')).toBeVisible();
});
