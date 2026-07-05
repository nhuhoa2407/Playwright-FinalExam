
import { test as base } from '@playwright/test';
import { BooksPage } from '../pages/bookstore-page';
import { LoginPage } from '../pages/login-page';
import { ProfilePage } from '../pages/profile-page';
import { BasePage } from '../pages/base-page';

type Fixtures = {
    booksPage : BooksPage 
    loginPage : LoginPage
    profilePage : ProfilePage
    basePage : BasePage
};

export const test = base.extend<Fixtures>({
  booksPage: async ({ page }, use) => {
    const booksPage = new BooksPage(page);
    await use(booksPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  }
});

export { expect } from '@playwright/test';
``
