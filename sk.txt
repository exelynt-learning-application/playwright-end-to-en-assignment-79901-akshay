const { test, expect } = require('@playwright/test');

test('course-list header matches its visual baseline', async ({ page }) => {
  await page.goto('/courses');

  const courseListHeader = page.locator('header').filter({
    has: page.getByRole('heading', { name: 'Course List', exact: true })
  });

  await expect(courseListHeader).toHaveScreenshot('course-list-header.png');
});
npx playwright test course-header-visual.spec.js --update-snapshots


npx playwright test course-header-visual.spec.js
