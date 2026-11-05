const { expect } = require('@playwright/test');

/**
 * Page object for the EXELYNT course catalog.
 *
 * Selector contract (adapt these to the actual EXELYNT markup if needed):
 * - Search: textbox with an accessible name containing "search"
 * - Course card: an article or element with data-testid="course-card"
 * - Course title: heading or link inside the matching card
 *
 * This class contains interactions and queries only; assertions belong in tests.
 */
class CourseCatalogPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.getByRole('textbox', { name: /search/i });
    this.courseCards = page.locator(
      '[data-testid="course-card"], article.course-card'
    );
  }

  async searchByTitle(title) {
    await this.searchBox.fill(title);
  }

  async openCourse(title) {
    const matchingCard = this.courseCards.filter({
      has: this.page.getByRole('heading', { name: title, exact: true })
    });

    // Prefer the course title link when present; otherwise click its heading.
    const titleLink = matchingCard.getByRole('link', {
      name: title,
      exact: true
    });

    if (await titleLink.count()) {
      await titleLink.first().click();
    } else {
      await matchingCard.getByRole('heading', {
        name: title,
        exact: true
      }).click();
    }
  }

  async getVisibleCourseCount() {
    return this.courseCards.filter({ visible: true }).count();
  }
}

module.exports = { CourseCatalogPage };
