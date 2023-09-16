import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Page, PageInfo } from './Page.model';
import { v4 as uuidv4 } from 'uuid';

const storageKey = 'pages';

const description = `Create flows by connecting pages together.

Enter a new page title and press return.

Tap or press enter to activate a page.

Keep adding pages to map out the hierarchy of your flow.

Press backspace to delete a page and all of its connections.
`;

const defaultState = [{ id: uuidv4(), title: '', description, active: true, connections: [] }];

function getStoredState(): Page[] | undefined {
	if (browser) {
		try {
			const state = window?.localStorage.getItem(storageKey);
			return state && JSON.parse(state);
		} catch {
			// don't care
		}
	}
}

const storedState = getStoredState();

export const pageStore = writable<Page[]>(storedState || defaultState);

if (browser) {
	pageStore.subscribe((pages) => {
		window?.localStorage.setItem(storageKey, JSON.stringify(pages));
	});
}

export function updatePage(page: Page) {
	pageStore.update((pages) => {
		const index = pages.findIndex((p) => p.id === page.id);
		pages[index] = page;
		return pages;
	});
}

export function addPage(pageInfo: PageInfo) {
	const id = uuidv4();
	const page = { id, ...pageInfo, connections: [] };
	pageStore.update((pages) => {
		pages.push(page);
		return pages;
	});
	return page;
}

export function addConnection(page: Page, pageInfo: PageInfo) {
	const connection = addPage(pageInfo);
	updatePage({ ...page, connections: [...page.connections, connection.id] });
}

export function removePage(id: string) {
	pageStore.update((pages) => {
		const index = pages.findIndex((page) => page.id === id);
		pages.splice(index, 1);
		return pages;
	});
}

export function reset() {
	pageStore.set(defaultState);
}
