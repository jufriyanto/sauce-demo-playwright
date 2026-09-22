import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getProductName(): Promise<string> {
    return await this.page.locator('.inventory_details_name').innerText();
  }

  async goBackToProducts() {
    await this.page.click('#back-to-products');
  }

  async addToCart() {
    await this.page.locator('[data-test^="add-to-cart"]').click();
  }

  async getDescription(): Promise<string> {
    return await this.page.locator('.inventory_details_desc').innerText();
  }
}
