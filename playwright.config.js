const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  retries: 1,

  use: {
    baseURL: 'https://staging.example.com',
    trace: 'on-first-retry'
  },

  reporter: 'html'
});
const { test, expect } = require('@playwright/test');

test.describe('Shared course data tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('Update shared course data', async ({ page }) => {
    await page.goto('/courses');
    // Update shared course data
  });

  test('Verify updated course data', async ({ page }) => {
    await page.goto('/courses');
    // Verify updated course data
  });
});
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shard }}/4
