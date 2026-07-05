import {Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ProfilePage extends BasePage {
    searchInput: Locator;
    okBtn: Locator;

    constructor(page: any) {
        super(page);
        this.searchInput = page.getByRole('textbox', { name: 'Type to search' });
        this.okBtn = page.locator('#closeSmallModal-ok');
    }

    // Get row locator by book name
    private getBookRow(bookName: string): Locator {
        return this.page.locator('tr', { has: this.page.getByRole('link', { name: bookName }) });
    }

    async search(title: string) {
        await this.searchInput.fill('');
        await this.searchInput.fill(title);
    }
    
    async deleteBookByTitle(bookName: string) {
        const bookRow = this.getBookRow(bookName);
        const deleteBtn = bookRow.locator('span[title="Delete"]');

        await deleteBtn.waitFor({ state: 'visible' });
        await deleteBtn.click();

        // Click OK on the confirmation modal
        await this.okBtn.waitFor({ state: 'visible' });
        await this.okBtn.click();
    }
    
    async countRowsByBookName(bookName: string): Promise<number> {
        const bookRow = this.getBookRow(bookName);
        return await bookRow.count();
    }

}