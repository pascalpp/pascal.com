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
    threshold: 0.1,
  });
});

test('Resume - Broadly slides', async ({ page }) => {
  const recentSection = page.getByLabel('Recent experience');
  expect(recentSection).toBeVisible();
  await recentSection.hover();
  await recentSection.focus();
  await recentSection.click();

  const broadlySlidesLink = recentSection.getByLabel('View Broadly slides');
  expect(broadlySlidesLink).toBeVisible();
  await broadlySlidesLink.hover();
  await broadlySlidesLink.focus();
  await broadlySlidesLink.click();

  expect(page.locator('dialog[open]')).toBeVisible();

  await expect(page).toHaveScreenshot('broadly-slides.png', {
    scale: 'device',
    fullPage: false,
    maxDiffPixelRatio: 0,
    threshold: 0.1,
  });

  await page.keyboard.press('Escape');
});

test('Resume - about.me slides', async ({ page }) => {
  const pastSection = page.getByLabel('Past experience');
  expect(pastSection).toBeVisible();
  await pastSection.hover();
  await pastSection.focus();
  await pastSection.click();

  const aboutmeSlidesLink = pastSection.getByLabel('View about.me slides');
  expect(aboutmeSlidesLink).toBeVisible();
  await aboutmeSlidesLink.hover();
  await aboutmeSlidesLink.focus();
  await aboutmeSlidesLink.click();

  await page.waitForLoadState('networkidle');
  expect(page.locator('dialog[open]')).toBeVisible();

  await expect(page).toHaveScreenshot('aboutme-slides.png', {
    scale: 'device',
    fullPage: false,
    maxDiffPixelRatio: 0,
    threshold: 0.1,
  });

  await page.keyboard.press('Escape');
});
