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
	const settingsButton = page.getByLabel('Settings button');
	const settingsMenu = page.getByLabel('Settings menu');
	await expect(settingsButton).toBeAttached();
	await expect(settingsButton).toBeVisible();
	await expect(settingsMenu).toBeAttached();
	await expect(settingsMenu).not.toBeVisible();

	await settingsButton.click();
	await expect(settingsMenu).toBeVisible();
	await expect(settingsMenu).toHaveScreenshot('settings-panel.png', { scale: 'device' });

	await page.getByLabel('Flow alignment: center').click();
	await expect(page).toHaveScreenshot('flow-alignment-center.png', { scale: 'device' });

	await page.getByLabel('Flow alignment: top').click();
	await expect(page).toHaveScreenshot('flow-alignment-top.png', { scale: 'device' });

	await settingsButton.click();
	await expect(settingsMenu).not.toBeVisible();
});
