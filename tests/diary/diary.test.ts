import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('/_vercel/insights/script.js', (route) => {
    route.fulfill({
      body: '',
    });
  });
});

test('CSS Grid Layout', async ({ page }) => {
  await page.goto('/diary/2023-11-20-css-grid-layout');

  await expect(page).toHaveScreenshot('css-grid-layout.png', {
    scale: 'device',
    fullPage: true,
    maxDiffPixelRatio: 0.1,
    threshold: 0.1,
  });
});
