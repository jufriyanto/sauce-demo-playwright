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

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async sortBy(value: string) {
    await this.page.selectOption('[data-test="product-sort-container"]', value);
  }

  async clickProduct(name: string) {
    await this.page.locator(`.inventory_item_name:text("${name}")`).click();
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }

  async removeFromCart(productName: string) {
    await this.page.locator(`.inventory_item:has-text("${productName}") button.btn_secondary`).click();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.page.locator(this.cartBadge).isVisible();
  }

  async getProductPrice(productName: string): Promise<string> {
    return await this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`).innerText();
  }
}
