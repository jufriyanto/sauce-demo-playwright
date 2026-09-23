import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures';

const { Given } = createBdd(test);

Given('I am on the products page as an authenticated user', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/inventory.html');
});
