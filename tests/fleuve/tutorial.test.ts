import { test, expect } from '@playwright/test';

// const maxDiffPixelRatio = 0.2;
// const threshold = 0.3;
// // const fullPage = true;
// const screenshotOptions = {
// 	maxDiffPixelRatio,
// 	threshold,
// }

test.beforeEach(async ({ page }) => {
	await page.route('/_vercel/insights/script.js', (route) => {
		route.fulfill({
			body: '',
		});
	});

	await page.goto('/fleuve');
});

test('Tutorial flow', async ({ page }) => {
	await expect(page.getByTestId('Fleuve')).toHaveScreenshot('fleuve.png');

	// focus the first card
	await page.getByTestId('Fleuve').press('ArrowRight');
	expect(page.getByTestId('Fleuve')).not.toBeFocused();
	expect(page.getByTestId('This is a card')).toBeFocused();
	expect(page.getByTestId('This is a card')).not.toHaveClass(/active/);

	// activate the first card
	await page.getByTestId('This is a card').press('ArrowRight');
	expect(page.getByTestId('This is a card')).toHaveClass(/active/);
	expect(page.getByTestId('Fleuve')).toHaveClass(/active/);
	await expect(page.getByTestId('This is a card')).toHaveScreenshot('card-1.png');

	// activate the second card
	await page.getByTestId('This is a card').press('ArrowDown');
	await page.getByTestId('A sibling card').press('Enter');
	expect(page.getByTestId('A sibling card')).toBeFocused();
	expect(page.getByTestId('A sibling card')).toHaveClass(/active/);
	expect(page.getByTestId('This is a card')).not.toHaveClass(/active/);

	// activate the editing card
	await page.getByTestId('A sibling card').press('ArrowDown');
	await page.getByTestId('Editing cards').press('Enter');
	expect(page.getByTestId('Editing cards')).toBeFocused();
	expect(page.getByTestId('Editing cards')).toHaveClass(/active/);
	expect(page.getByTestId('A sibling card')).not.toHaveClass(/active/);

	// edit the title
	await page.getByTestId('Editing cards').press('Tab');
	await expect(page.getByTestId('Editing cards').getByTestId('Title').getByRole('textbox')).toBeFocused();
	await page.getByTestId('Editing cards').getByTestId('Title').getByRole('textbox').pressSequentially('A new title');
	await page.getByTestId('Editing cards').getByTestId('Title').getByRole('textbox').press('Enter');
	await expect(page.getByTestId('A new title')).toBeFocused(); // await for test id to change

	// edit the description
	// await page.keyboard.press('Tab');
	// await page.keyboard.press('Tab');
	// await page.keyboard.press('Enter');
	await page.keyboard.press('d');
	await expect(page.getByTestId('A new title').getByTestId('Description').getByRole('textbox')).toBeFocused();
	await page.getByTestId('A new title').getByTestId('Description').getByRole('textbox').press('Escape');
	await expect(page.getByTestId('A new title').getByTestId('Description').getByRole('textbox')).not.toBeAttached();
	await expect(page.getByTestId('A new title')).toBeFocused();

	// drill down the levels
	await page.getByTestId('A new title').press('ArrowDown');
	await expect(page.getByTestId('A new title')).not.toBeFocused();
	await expect(page.getByTestId('Infinite levels')).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(page.getByTestId('Deeper still')).toBeFocused();
	await expect(page.getByTestId('Deeper still')).toHaveClass(/active/);
	await expect(page.getByTestId('Another level')).toHaveClass(/active/);
	await expect(page.getByTestId('Next level')).toHaveClass(/active/);
	await expect(page.getByTestId('Infinite levels')).toHaveClass(/active/);
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowLeft');
	await expect(page.getByTestId('Infinite levels')).toBeFocused();

	// delete a card
	await page.getByTestId('Infinite levels').press('ArrowDown');
	await page.getByTestId('Deleting cards').press('Enter');
	await expect(page.getByTestId('Deleting cards')).toBeFocused();
	await expect(page.getByTestId('Deleting cards')).toHaveClass(/active/);
	await expect(page.getByTestId('I’ll be deleted too!')).toBeAttached();
	//register dialog handler before invoking the dialog
	page.once('dialog', (dialog) => dialog.accept());
	await page.getByTestId('Deleting cards').press('Backspace');
	await expect(page.getByTestId('Deleting cards')).not.toBeAttached();
	await expect(page.getByTestId('I’ll be deleted too!')).not.toBeAttached();
	await expect(page.getByTestId('Reorder cards')).toBeFocused();

	// reorder cards
	await page.getByTestId('Reorder cards').press('Enter');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('Enter');
	await page.keyboard.press('Shift+ArrowDown');
	await expect(page).toHaveScreenshot('reorder-1.png');
	await page.keyboard.press('Shift+ArrowRight');
	await expect(page.getByTestId('Insert cards')).toHaveClass(/active/);
	await expect(page).toHaveScreenshot('reorder-2.png');
	await page.keyboard.press('Shift+ArrowLeft');
	await expect(page.getByTestId('Insert cards')).not.toHaveClass(/active/);
	await expect(page).toHaveScreenshot('reorder-3.png');
	await page.keyboard.press('Shift+ArrowUp');
	await expect(page).toHaveScreenshot('reorder-4.png');

	// insert cards
	await page.keyboard.press('ArrowDown');
	await page.getByTestId('Insert cards').press('Enter');
	await expect(page.getByTestId('Insert cards')).toHaveClass(/active/);
	await page.keyboard.press('Alt+ArrowRight');
	await expect(page.getByTestId('Untitled card')).toBeAttached();
	await expect(page.getByTestId('Untitled card')).toHaveClass(/active/);
	await expect(page.getByTestId('Insert cards')).toBeFocused();
	await page.keyboard.press('Alt+ArrowLeft');
	await expect(page.getByTestId('Untitled card')).not.toBeAttached();
	await expect(page.getByTestId('Insert cards')).toBeFocused();

	// add a child card
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(page.getByTestId('Add more cards')).toBeFocused();
	await expect(page.getByTestId('Add more cards')).toHaveClass(/active/);
	await page.keyboard.press('ArrowRight');
	await page.keyboard.type('Another child card');
	await page.keyboard.press('Enter');
	await expect(page.getByTestId('Another child card')).toBeFocused();
	await expect(page.getByTestId('Another child card')).toHaveClass(/active/);

	// add a sibling card
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.type('Another sibling card');
	await page.keyboard.press('Enter');
	await expect(page.getByTestId('Another sibling card')).toBeFocused();
	await expect(page.getByTestId('Another sibling card')).toHaveClass(/active/);

	// delete tutorial flow
	await page.keyboard.press('ArrowLeft');
	await expect(page.getByTestId('Fleuve')).toBeFocused();
	page.once('dialog', (dialog) => dialog.dismiss());
	await page.keyboard.press('Backspace');
	await expect(page.getByTestId('Fleuve')).toBeAttached();
	page.once('dialog', (dialog) => dialog.accept());
	await page.keyboard.press('Backspace');
	await expect(page.getByTestId('Fleuve')).not.toBeAttached();
	await expect(page).toHaveScreenshot('deleted-tutorial.png');
});
