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
	const fleuveCard = page.getByTestId('Fleuve');
	expect(fleuveCard).toBeFocused();
	await expect(fleuveCard).toHaveScreenshot('fleuve.png', { scale: 'device' });

	// focus the first child card
	const firstCard = page.getByTestId('This is a card');
	await page.keyboard.press('ArrowRight');
	expect(fleuveCard).not.toBeFocused();
	expect(firstCard).toBeFocused();
	expect(firstCard).not.toHaveClass(/active/);

	// activate the first card
	await page.keyboard.press('ArrowRight');
	expect(firstCard).toHaveClass(/active/);
	expect(fleuveCard).toHaveClass(/active/);
	await expect(firstCard).toHaveScreenshot('card-1.png', { scale: 'device' });

	// activate the second card
	const siblingCard = page.getByTestId('A sibling card');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	expect(siblingCard).toBeFocused();
	expect(siblingCard).toHaveClass(/active/);
	expect(firstCard).not.toHaveClass(/active/);

	// activate the editing card
	const editingCard = page.getByTestId('Editing cards');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	expect(editingCard).toBeFocused();
	expect(editingCard).toHaveClass(/active/);
	expect(siblingCard).not.toHaveClass(/active/);

	// edit the title
	const titleEditor = editingCard.getByTestId('Title').getByRole('textbox');
	await page.keyboard.press('Tab');
	await expect(titleEditor).toBeFocused();
	await titleEditor.pressSequentially('A new title');
	await titleEditor.press('Enter');
	const updatedEditngCard = page.getByTestId('A new title');
	await expect(updatedEditngCard).toBeFocused(); // await for test id to change

	// edit the description
	await page.keyboard.press('d');
	const descriptionEditor = updatedEditngCard.getByTestId('Description').getByRole('textbox');
	await expect(descriptionEditor).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(descriptionEditor).not.toBeAttached();
	await expect(updatedEditngCard).toBeFocused();

	// drill down the levels
	const level1 = page.getByTestId('Infinite levels');
	const level2 = page.getByTestId('Next level');
	const level3 = page.getByTestId('Another level');
	const level4 = page.getByTestId('Deeper still');

	await page.keyboard.press('ArrowDown');
	await expect(updatedEditngCard).not.toBeFocused();
	await expect(level1).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(level1).toHaveClass(/active/);
	await expect(level2).toHaveClass(/active/);
	await expect(level3).toHaveClass(/active/);
	await expect(level4).toHaveClass(/active/);
	await expect(level4).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowLeft');
	await page.keyboard.press('ArrowLeft');
	await expect(level1).toBeFocused();

	// delete a card
	const deleteCard = page.getByTestId('Deleting cards');
	const deleteChildCard = page.getByTestId('I’ll be deleted too!');
	const reorderCard = page.getByTestId('Reorder cards');

	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(deleteCard).toBeFocused();
	await expect(deleteCard).toHaveClass(/active/);
	await expect(deleteChildCard).toBeAttached();
	//register dialog handler before invoking the dialog
	page.once('dialog', (dialog) => dialog.accept());
	await page.keyboard.press('Backspace');
	await expect(deleteCard).not.toBeAttached();
	await expect(deleteChildCard).not.toBeAttached();
	await expect(reorderCard).toBeFocused();

	// reorder cards
	const rearrangeCard = page.getByTestId('Rearrange me');
	const insertCard = page.getByTestId('Insert cards');
	await page.keyboard.press('Enter');
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('Enter');
	await expect(rearrangeCard).toBeFocused();
	await expect(rearrangeCard).toHaveClass(/active/);

	await page.keyboard.press('Shift+ArrowDown');
	await expect(page).toHaveScreenshot('reorder-1.png', { scale: 'device' });
	await page.keyboard.press('Shift+ArrowRight');
	await expect(insertCard).toHaveClass(/active/);
	await expect(page).toHaveScreenshot('reorder-2.png', { scale: 'device' });
	await page.keyboard.press('Shift+ArrowLeft');
	await expect(insertCard).not.toHaveClass(/active/);
	await expect(page).toHaveScreenshot('reorder-3.png', { scale: 'device' });
	await page.keyboard.press('Shift+ArrowUp');
	await expect(page).toHaveScreenshot('reorder-4.png', { scale: 'device' });

	// insert cards
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(insertCard).toBeFocused();
	await expect(insertCard).toHaveClass(/active/);
	await page.keyboard.press('Alt+ArrowRight');
	const untitledCard = page.getByTestId('Untitled card');
	await expect(untitledCard).toBeAttached();
	await expect(untitledCard).toHaveClass(/active/);
	await expect(insertCard).toBeFocused();
	await page.keyboard.press('Alt+ArrowLeft');
	await expect(untitledCard).not.toBeAttached();
	await expect(insertCard).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(reorderCard).toBeFocused();

	// add a child card
	const addMoreCard = page.getByTestId('Add more cards');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(addMoreCard).toBeFocused();
	await expect(addMoreCard).toHaveClass(/active/);
	await page.keyboard.press('ArrowRight');
	await page.keyboard.type('Another child card');
	await page.keyboard.press('Enter');
	const addedChildCard = page.getByTestId('Another child card');
	await expect(addedChildCard).toBeFocused();
	await expect(addedChildCard).toHaveClass(/active/);
	await page.keyboard.press('ArrowLeft');
	await expect(addMoreCard).toBeFocused();

	// add a sibling card
	await page.keyboard.press('ArrowDown');
	await page.keyboard.type('Another sibling card');
	await page.keyboard.press('Enter');
	const addedSiblingCard = page.getByTestId('Another sibling card');
	await expect(addedSiblingCard).toBeFocused();
	await expect(addedSiblingCard).toHaveClass(/active/);

	// delete tutorial flow
	await page.keyboard.press('ArrowLeft');
	await expect(fleuveCard).toBeFocused();
	// test that canceling the dialog does not delete the card
	page.once('dialog', (dialog) => dialog.dismiss());
	await page.keyboard.press('Backspace');
	await expect(fleuveCard).toBeAttached();
	// test that accepting the dialog deletes the card
	page.once('dialog', (dialog) => dialog.accept());
	await page.keyboard.press('Backspace');
	await expect(fleuveCard).not.toBeAttached();
	await expect(page).toHaveScreenshot('deleted-tutorial.png', { scale: 'device' });
});
