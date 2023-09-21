export default function focusElement(id?: string): HTMLElement | undefined {
	const element = document.querySelector(`[data-page-id="${id}"] [tabindex]`) as HTMLElement;
	console.log('focusElement', id, element);
	element?.focus();
	return element;
}
