import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private pageTitle = '.title';
  private cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    return await this.page.locator(this.pageTitle).innerText();
  }

  async addToCart(productName: string) {
    const addButton = this.page.locator(`.inventory_item:has-text("${productName}") button`);
    await addButton.click();
  }

  async getCartCount(): Promise<string> {
    return await this.page.locator(this.cartBadge).innerText();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
