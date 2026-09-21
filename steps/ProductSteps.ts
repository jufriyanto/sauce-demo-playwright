import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

const { When, Then } = createBdd();

Then('I should see {string} as the page title', async ({ page }, title: string) => {
  await expect(page.locator('.title')).toHaveText(title);
});

Then('I should see {int} products', async ({ page }, count: number) => {
  const productsPage = new ProductsPage(page);
  expect(await productsPage.getProductCount()).toBe(count);
});

When('I sort products by {string}', async ({ page }, sortValue: string) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortBy(sortValue);
});

Then('the first product should be {string}', async ({ page }, productName: string) => {
  const productsPage = new ProductsPage(page);
  const names = await productsPage.getProductNames();
  expect(names[0]).toBe(productName);
});

When('I click on product {string}', async ({ page }, productName: string) => {
  const productsPage = new ProductsPage(page);
  await productsPage.clickProduct(productName);
});

Then('I should see product detail for {string}', async ({ page }, productName: string) => {
  const detailPage = new ProductDetailPage(page);
  expect(await detailPage.getProductName()).toBe(productName);
});

When('I go back to products', async ({ page }) => {
  const detailPage = new ProductDetailPage(page);
  await detailPage.goBackToProducts();
});

When('I add the product to cart from the detail page', async ({ page }) => {
  const detailPage = new ProductDetailPage(page);
  await detailPage.addToCart();
});

When('I remove {string} from the cart on the products page', async ({ page }, productName: string) => {
  const productsPage = new ProductsPage(page);
  await productsPage.removeFromCart(productName);
});

Then('the cart badge should not be visible', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  expect(await productsPage.isCartBadgeVisible()).toBe(false);
});

Then('I should see the price of {string} as {string}', async ({ page }, productName: string, price: string) => {
  const productsPage = new ProductsPage(page);
  expect(await productsPage.getProductPrice(productName)).toBe(price);
});
