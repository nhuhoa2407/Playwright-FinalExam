import { test, expect } from '../fixtures/page-fixtures';
import {applicationurl} from '../constants/url';
import {bookName, bookSearchData} from '../test-data/book-search.ts';
import { user } from '../test-data/user.ts';
import { AccountApi } from '../api/account-api.ts';
import { AddBookApi } from '../api/book-api.ts';

test.describe('Delete book', () => {

  test.beforeEach(async ({ page }) => {
    //Step 1: Given there is book named "Learning JavaScript Design Patterns"
    // Get token
    const tokenRes = await AccountApi.generateToken(user.username, user.password);
    const token = tokenRes.token;
    expect(token).toBeTruthy();
    
    // Delete all books first to avoid duplicate error
    await AddBookApi.deleteAllBooks(user.userId, token);

    // Add book via API
    const addRes = await AddBookApi.addBook(user.userId, bookName.isbn, token);
    expect(addRes.books[0].isbn).toBe(bookName.isbn);
    console.log("Book is added successfully via API");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`Verify deleting book successfully`, async ({ page, loginPage, profilePage, basePage }) => {
      // Handle browser dialogs (confirmation + "Book deleted." alert)
      page.on('dialog', async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`);
          await dialog.accept();
      });

      //Step 2: And the user logs into application
      await page.goto(applicationurl);
      await loginPage.login(user.username, user.password);
      // Verify user login successfully
      console.log("Login Success");

      await expect(basePage.usernameLabel).toHaveText(user.username);
      console.log("Verify username display done");

      // Step 3. And the user is on Profile page (after login, the user is redirected to Profile page) 
      await page.waitForLoadState('domcontentloaded');
      console.log("Go to Profile Page");

      // Step 4. When the user search book "Learning JavaScript Design Patterns"
      await page.waitForTimeout(2000);
      await profilePage.search(bookName.title);
      console.log("Search book ok");

      // Wait for search results to update
      await page.waitForTimeout(1000);

      const countBeforeDelete = await profilePage.countRowsByBookName(bookName.title);
      console.log(`Number of book before deleting: ${countBeforeDelete}`);
      expect(countBeforeDelete).toBeGreaterThan(0);

      // Step 5. And the user clicks on Delete icon
      // Step 7. And the user clicks on OK button of alert "Book deleted."
      await profilePage.deleteBookByTitle(bookName.title);
      console.log("Deleting successfully");

      // 8. And the book is not shown
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      await profilePage.search(bookName.title);
      await page.waitForTimeout(1000);
      
      const countAfterDelete = await profilePage.countRowsByBookName(bookName.title);
      console.log(`Number of book after deleting: ${countAfterDelete}`);
      expect(countAfterDelete).toBe(0);
  });

});