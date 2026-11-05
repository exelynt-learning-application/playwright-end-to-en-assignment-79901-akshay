const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');

test('exports the course list as a non-empty CSV file', async ({ page }) => {
  await page.goto('/courses');

  // Listen before clicking Export
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /export/i }).click();

  const download = await downloadPromise;
  const filename = download.suggestedFilename();

  // Check CSV filename
  expect(filename).toMatch(/\.csv$/i);

  // Save downloaded file
  const filePath = path.join(test.info().outputDir, filename);
  await download.saveAs(filePath);

  // Verify file is not empty
  const stats = await fs.stat(filePath);
  expect(stats.size).toBeGreaterThan(0);
});
The `page.waitForEvent('download')` listener must be registered before clicking the Export button because the download event can fire immediately after the click. If the listener is registered after the click, Playwright may miss the download event, causing the test to fail or time out. By setting up the listener first and then clicking Export, we ensure the download is captured reliably.
