import { test, expect } from '../fixtures/page-fixtures';
import {applicationurl} from '../constants/url';
import {bookSearchData} from '../test-data/book-search.ts';

test.describe('Search book', () => {
  test.beforeEach(async ({ page }) => {
    //Step 2: The user is on Book Store page (https://demoqa.com/books)
    await page.goto(applicationurl);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  for (const keyword of bookSearchData.keywords) {
    test(`Search "${keyword}" returns multiple correct results`, async ({ booksPage }) => {
      // Step 3: When the user input book name “Design” or "design"
      await booksPage.search(keyword);

      // Wait until at least 1 search result is returned
      await expect(booksPage.bookLinkLocator).not.toHaveCount(0);

      // Get the titles from search results
      const titles = await booksPage.getVisibleTitles();
      console.log('Book titles:', titles);

      //Step 4: Verify that all books match with input criteria will be displayed
      // 1) There are at least 2 results
      expect(titles.length).toBeGreaterThanOrEqual(2);
      console.log(`Number of results for "${keyword}": ${titles.length}`);

      // 2) All results contain the keyword (case-insensitive)
      const lc = keyword.toLowerCase();
      for (const t of titles) {
        expect(t.toLowerCase()).toContain(lc);
      }
      console.log(`All results contain the keyword "${keyword}"`);

      // 3) Two required books must appear
      console.log('Verify expected books exist');
      for (const expectedBooks of bookSearchData.expectedTitles) {
        console.log(`Checking for expected book: ${expectedBooks}`);

        const found = titles.some(t => new RegExp(expectedBooks, 'i').test(t));
        console.log(`Found: ${found}`);

        expect(found, `Book not found: ${expectedBooks}`).toBeTruthy();
        console.log(`"${expectedBooks}" found`);

      }
    });
  }
});