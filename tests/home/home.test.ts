import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('/_vercel/insights/script.js', (route) => {
    route.fulfill({
      body: '',
    });
  });

  await page.goto('/');
});

test('Home page', async ({ page }) => {
  await expect(page).toHaveScreenshot('homepage.png', {
    scale: 'device',
    fullPage: true,
    maxDiffPixelRatio: 0,
    threshold: 0.1,
  });
});
