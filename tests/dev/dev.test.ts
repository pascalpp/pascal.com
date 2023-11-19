import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('/_vercel/insights/script.js', (route) => {
    route.fulfill({
      body: '',
    });
  });

  await page.goto('/dev');
});

test('Resume', async ({ page }) => {
  await expect(page).toHaveScreenshot('resume.png', {
    scale: 'device',
    fullPage: true,
    maxDiffPixelRatio: 0,
    threshold: 0,
  });
});
