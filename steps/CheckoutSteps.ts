import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const { When, Then } = createBdd();

When('I proceed to checkout', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();
});

When('I fill checkout info with {string}, {string}, and {string}', async ({ page }, firstName: string, lastName: string, zipCode: string) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInfo(firstName, lastName, zipCode);
  await checkoutPage.clickContinue();
});

Then('I should see a checkout error {string}', async ({ page }, errorMessage: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getErrorMessage()).toContain(errorMessage);
});

When('I finish the order', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickFinish();
});

Then('I should see the order confirmation {string}', async ({ page }, message: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getConfirmationHeader()).toBe(message);
});

Then('the order overview should contain {string}', async ({ page }, productName: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getOverviewItemNames()).toContain(productName);
});

When('I go back home', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickBackHome();
});

Then('the item total should be {string}', async ({ page }, total: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getItemTotal()).toBe(total);
});

When('I cancel the order', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickCancel();
});

When('I cancel on the checkout form', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.cancelOnForm();
});

Then('the tax should be {string}', async ({ page }, tax: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getTax()).toBe(tax);
});

Then('the grand total should be {string}', async ({ page }, total: string) => {
  const checkoutPage = new CheckoutPage(page);
  expect(await checkoutPage.getGrandTotal()).toBe(total);
});
