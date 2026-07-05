import {Page, Locator } from '@playwright/test';

export class BasePage {
    page : Page;
    navLogin : Locator;
    navProfile : Locator;
    usernameLabel : Locator

    constructor(page: Page) {
        this.page = page;
        this.navLogin = page.getByRole('listitem').filter({ hasText: 'Login' });
        this.navProfile = page.getByRole('listitem').filter({ hasText: 'Profile' });
        this.usernameLabel = page.locator('#userName-value');
    }

    async gotoLoginPage() {
        await this.navLogin.click();
    }

    async gotoProfilePage() {
        await this.navProfile.click();
    }
    

}