import {Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';


export class LoginPage extends BasePage {
    usernameInput : Locator;
    passwordInput: Locator;
    btnLogin: Locator;

    constructor(page: any) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'UserName' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {
        await this.gotoLoginPage();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.btnLogin.click();
    }

}