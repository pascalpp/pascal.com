import { expect, test } from '@playwright/test';

const maxDiffPixelRatio = 0.01;
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

	await expect(page).toHaveScreenshot('default-view.png', {
		maxDiffPixelRatio,
		threshold,
	});
});

test.skip('Settings panel', async ({ page }) => {
	await expect(page.locator('#settings-button')).toBeVisible();
	await expect(page.locator('#settings-panel')).toBeHidden();

	// expect(page.locator('#settings-panel')).toBeVisible();

	// await expect(page.locator('#settings-panel')).toHaveScreenshot('settings-panel.png', {
	// 	maxDiffPixelRatio,
	// 	threshold,
	// });

	// expect(await page.locator('#settings-panel').screenshot()).toMatchSnapshot('settings-panel.png', {
	// 	maxDiffPixelRatio,
	// 	threshold,
	// });
});
