export function focusNextElement(
	fromElement: HTMLElement = document.activeElement as HTMLElement
): HTMLElement | undefined {
	const focusable = getFocusableElements();
	const index = focusable.indexOf(fromElement);
	const nextElement = focusable[index + 1] || focusable[0];
	nextElement?.focus();
	return nextElement;
}

export function focusPreviousElement(
	fromElement: HTMLElement = document.activeElement as HTMLElement
): HTMLElement | undefined {
	const focusable = getFocusableElements();
	const index = focusable.indexOf(fromElement);
	const previousElement = focusable[index - 1] || focusable[0];
	previousElement?.focus();
	return previousElement;
}

function getFocusableElements(): HTMLElement[] {
	return Array.from(
		document.querySelectorAll(
			'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
		)
	);
}

export function focusPageId(id?: string): HTMLElement | undefined {
	if (!id) return undefined;
	const selector = `[data-page-id="${id}"] [tabindex]`;
	return focusSelector(selector);
}

export function focusSelector(selector?: string): HTMLElement | undefined {
	if (!selector) return undefined;
	const element = document.querySelector(selector) as HTMLElement;
	console.log('focusSelector', selector, element);
	element?.focus();
	return element;
}
