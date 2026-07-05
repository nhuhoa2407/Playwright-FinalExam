
import {Page, Locator } from '@playwright/test';

export class BooksPage {
  page: Page;
  searchInput: Locator;
  bookLinkLocator: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Type to search' });
    this.bookLinkLocator = page.locator('.action-buttons a');
  }
 
async search(keyword: string) {
    await this.searchInput.fill('');
    await this.searchInput.fill(keyword);
  }

  async getVisibleTitles(): Promise<string[]> {
    const count = await this.bookLinkLocator.count();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      titles.push((await this.bookLinkLocator.nth(i).innerText()).trim());
    }
    return titles;
  }
  
}
