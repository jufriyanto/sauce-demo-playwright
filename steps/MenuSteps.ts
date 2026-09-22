import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';

const { When, Then } = createBdd();

When('I open the burger menu', async ({ page }) => {
  const menuPage = new MenuPage(page);
  await menuPage.openMenu();
});

When('I click {string} in the burger menu', async ({ page }, menuItem: string) => {
  const menuPage = new MenuPage(page);
  if (menuItem === 'All Items') {
    await menuPage.clickAllItems();
  } else if (menuItem === 'About') {
    await menuPage.clickAbout();
  } else if (menuItem === 'Reset App State') {
    await menuPage.clickResetAppState();
  }
});

When('I close the burger menu', async ({ page }) => {
  const menuPage = new MenuPage(page);
  await menuPage.closeMenu();
});

Then('I should be navigated to the Sauce Labs website', async ({ page }) => {
  await page.waitForURL(/saucelabs\.com/);
  await expect(page).toHaveURL(/saucelabs\.com/);
});

Then('the burger menu should be closed', async ({ page }) => {
  const menuPage = new MenuPage(page);
  expect(await menuPage.isMenuClosed()).toBe(true);
});
