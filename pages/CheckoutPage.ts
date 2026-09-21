import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', zipCode);
  }

  async clickContinue() {
    await this.page.click('#continue');
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.locator('[data-test="error"]').innerText();
  }

  async clickFinish() {
    await this.page.click('#finish');
  }

  async getConfirmationHeader(): Promise<string> {
    return await this.page.locator('.complete-header').innerText();
  }

  async getOverviewItemNames(): Promise<string[]> {
    return await this.page.locator('.cart_item .inventory_item_name').allInnerTexts();
  }

  async clickBackHome() {
    await this.page.click('[data-test="back-to-products"]');
    await this.page.waitForURL('**/inventory.html');
  }
}
