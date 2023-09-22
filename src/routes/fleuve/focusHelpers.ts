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
	if (!id) return;
	const element = document.getElementById(id);
	return focusElement(element);
}

export function focusSelector(selector?: string): HTMLElement | undefined {
	if (!selector) return;
	const element = document.querySelector(selector) as HTMLElement;
	return focusElement(element);
}

export function focusElement(element: HTMLElement | undefined | null): HTMLElement | undefined {
	if (!element) return;
	element.focus();
	element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	return element;
}
