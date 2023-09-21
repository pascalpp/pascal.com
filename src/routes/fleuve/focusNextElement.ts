export default function focusNextElement() {
	const focusable: HTMLElement[] = Array.from(
		document.querySelectorAll(
			'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
		)
	);

	const index = focusable.indexOf(document.activeElement as HTMLElement);
	const nextElement = focusable[index + 1] || focusable[0];
	nextElement?.focus();
}
