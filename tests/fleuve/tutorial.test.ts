import { expect, test } from '@playwright/test';

const maxDiffPixelRatio = 0.1;
const threshold = 0.3;
// const fullPage = true;

test.beforeEach(async ({ page }) => {
	await page.route('/_vercel/insights/script.js', (route) => {
		route.fulfill({
			body: '',
		});
	});

	await page.goto('/fleuve');
});

test('Default view', async ({ page }) => {
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Fleuve');

	// await page.evaluate(() => {
	// 	localStorage.removeItem('pages');
	// 	localStorage.removeItem('settings');
	// 	window.location.reload();
	// });

	await page.locator('#tutorial-start-page').isVisible();

	// await expect(page).toHaveScreenshot('default-view.png', {
	// 	maxDiffPixelRatio,
	// 	threshold,
	// });
});

test('Settings menu', async ({ page }) => {
	await expect(page.getByRole('button', { name: 'Settings button' })).toBeAttached();
	await expect(page.getByRole('button', { name: 'Settings button' })).toBeVisible();
	await expect(page.getByRole('menu', { name: 'Settings menu' })).toBeAttached();
	await expect(page.getByRole('menu', { name: 'Settings menu' })).not.toBeVisible();

	await page.getByRole('button', { name: 'Settings button' }).click();
	await expect(page.getByRole('menu', { name: 'Settings menu' })).toBeVisible();

	await expect(page.getByRole('menu', { name: 'Settings menu' })).toHaveScreenshot('settings-panel.png', {
		maxDiffPixelRatio,
		threshold,
	});

	await page.getByRole('button', { name: 'Settings button' }).click();
	await expect(page.getByRole('menu', { name: 'Settings menu' })).not.toBeVisible();
});
