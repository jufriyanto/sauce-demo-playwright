import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',
  outputDir: '.features-gen',
  importTestFrom: 'fixtures/index.ts',
});

export default defineConfig({
  testDir,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  fullyParallel: false,
  retries: 1,
  workers: 1,
});
