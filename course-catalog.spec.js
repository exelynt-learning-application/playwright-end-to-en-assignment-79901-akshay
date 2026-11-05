const { test, expect } = require('@playwright/test');
const { CourseCatalogPage } = require('./CourseCatalogPage');

test.describe('EXELYNT course catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses');
  });

  test('searches for a course by title', async ({ page }) => {
    const catalog = new CourseCatalogPage(page);

    await catalog.searchByTitle('Playwright');

    await expect(
      page.getByRole('heading', { name: 'Playwright', exact: true })
    ).toBeVisible();
    await expect.poll(() => catalog.getVisibleCourseCount()).toBe(1);
  });

  test('opens the selected course', async ({ page }) => {
    const catalog = new CourseCatalogPage(page);

    await catalog.openCourse('Playwright E2E Testing');

    await expect(
      page.getByRole('heading', { name: 'Playwright E2E Testing', exact: true })
    ).toBeVisible();
  });
});
