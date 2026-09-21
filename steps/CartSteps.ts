import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

const { Given, When, Then } = createBdd();

Given('I am logged in as {string}', async ({ page }, username: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, 'secret_sauce');
});

When('I add {string} to the cart', async ({ page }, productName: string) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addToCart(productName);
});

When('I go to the cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goToCart();
});

Then('the cart badge should show {string}', async ({ page }, count: string) => {
  const productsPage = new ProductsPage(page);
  const cartCount = await productsPage.getCartCount();
  expect(cartCount).toBe(count);
});

Then('I should see {string} in the cart', async ({ page }, productName: string) => {
  const cartPage = new CartPage(page);
  const items = await cartPage.getItemNames();
  expect(items).toContain(productName);
});

When('I remove {string} from the cart', async ({ page }, productName: string) => {
  const cartPage = new CartPage(page);
  await cartPage.removeItem(productName);
});

Then('the cart should be empty', async ({ page }) => {
  const cartPage = new CartPage(page);
  expect(await cartPage.isEmpty()).toBe(true);
});

When('I continue shopping', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.continueShopping();
});
