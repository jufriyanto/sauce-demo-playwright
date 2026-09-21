import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private cartTitle = '.title';
  private cartItems = '.cart_item';
  private checkoutButton = '#checkout';

  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    return await this.page.locator(this.cartTitle).innerText();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.cart_item .inventory_item_name').allInnerTexts();
  }

  async getItemCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async removeItem(productName: string) {
    await this.page.locator(`.cart_item:has-text("${productName}") button`).click();
  }

  async isEmpty(): Promise<boolean> {
    return (await this.page.locator(this.cartItems).count()) === 0;
  }

  async continueShopping() {
    await this.page.click('#continue-shopping');
  }
}
