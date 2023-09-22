import { expect, test } from '@playwright/test';

const maxDiffPixelRatio = 0.01;
const threshold = 0.3;
const fullPage = true;

test('Default view - tutorial flow', async ({ page }) => {
	await page.route('/_vercel/insights/script.js', (route) => {
		route.fulfill({
			body: '',
		});
	});

	await page.goto('/fleuve');

	await page.evaluate(() => {
		localStorage.removeItem('pages');
		localStorage.removeItem('settings');
		window.location.reload();
	});

	await page.locator('#tutorial-start-page').isVisible();

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Fleuve');
});
