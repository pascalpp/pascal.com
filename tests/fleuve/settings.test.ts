import { expect, test } from '@playwright/test';

// const maxDiffPixelRatio = 0.2;
// const threshold = 0.3;
// const fullPage = true;
// const screenshotOptions = {
// 	maxDiffPixelRatio,
// 	threshold,
// };

test.beforeEach(async ({ page }) => {
	await page.route('/_vercel/insights/script.js', (route) => {
		route.fulfill({
			body: '',
		});
	});

	await page.goto('/fleuve');
});

test('Settings', async ({ page }) => {
	await expect(page.getByLabel('Settings button')).toBeAttached();
	await expect(page.getByLabel('Settings button')).toBeVisible();
	await expect(page.getByLabel('Settings menu')).toBeAttached();
	await expect(page.getByLabel('Settings menu')).not.toBeVisible();

	await page.getByLabel('Settings button').click();
	await expect(page.getByLabel('Settings menu')).toBeVisible();

	await expect(page.getByLabel('Settings menu')).toHaveScreenshot('settings-panel.png', { scale: 'device' });

	await page.getByLabel('Flow alignment: center').click();
	await expect(page).toHaveScreenshot('flow-alignment-center.png', { scale: 'device' });

	await page.getByLabel('Flow alignment: top').click();
	await expect(page).toHaveScreenshot('flow-alignment-top.png', { scale: 'device' });

	await page.getByLabel('Settings button').click();
	await expect(page.getByLabel('Settings menu')).not.toBeVisible();
});
