export default function focusNextElement(
	fromElement: HTMLElement = document.activeElement as HTMLElement
): HTMLElement | undefined {
	const focusable: HTMLElement[] = Array.from(
		document.querySelectorAll(
			'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
		)
	);

	const index = focusable.indexOf(fromElement);
	console.log(focusable, index);
	const nextElement = focusable[index + 1] || focusable[0];
	nextElement?.focus();
	return nextElement;
}
