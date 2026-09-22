import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openMenu() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.waitForSelector('.bm-menu-wrap[aria-hidden="false"]');
  }

  async closeMenu() {
    await this.page.click('.bm-cross-button');
    await this.page.waitForSelector('.bm-menu-wrap[aria-hidden="true"]');
  }

  async clickAllItems() {
    await this.page.click('#inventory_sidebar_link');
  }

  async clickAbout() {
    await this.page.click('#about_sidebar_link');
  }

  async clickResetAppState() {
    await this.page.click('#reset_sidebar_link');
  }

  async isMenuClosed(): Promise<boolean> {
    const ariaHidden = await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden');
    return ariaHidden === 'true';
  }
}
