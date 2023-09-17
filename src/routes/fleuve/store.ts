import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Page, PageInfo, PageId } from './Page.model';
import { v4 as uuidv4 } from 'uuid';

const storageKey = 'pages';

const description = `
• Create flows by connecting pages.
• Use arrow keys to navigate between pages.
• Tap or press enter to activate a page.
• Press backspace to delete a page and all of its connections.
`;

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

function getDefaultState() {
	return [{ id: uuidv4(), title: '', description: description.trim(), active: true, connections: [] }];
}

const storedState = getStoredState();

export const pageStore = writable<Page[]>(storedState || getDefaultState());

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

export function activatePage(id: PageId) {
	pageStore.update((pages) => {
		const parentPages = getAllParentPages(pages, id);
		const siblings = parentPages.reduce((acc, item) => [...acc, ...item.connections], [] as PageId[]);
		const parentPageIds = parentPages.map((item) => item.id);
		const activePageIds = [id, ...parentPageIds];
		const childPageIds = getAllChildPages(pages, id).map((item) => item.id);
		const inactivePageIds = [...siblings, ...childPageIds];
		pages.forEach((item) => {
			if (inactivePageIds.includes(item.id)) {
				item.active = false;
			}
			if (activePageIds.includes(item.id)) {
				item.active = true;
			}
		});
		return pages;
	});
}

function getAllParentPages(pages: Page[], id: PageId): Page[] {
	const parentPage = pages.find((item) => item.connections.includes(id));
	return parentPage ? [parentPage, ...getAllParentPages(pages, parentPage.id)] : [];
}

function getAllChildPages(pages: Page[], id: PageId): Page[] {
	const parentPage = pages.find((item) => item.id === id);
	const childPages = parentPage?.connections.map((itemId) => pages.find((item) => item.id === itemId) as Page) ?? [];
	return childPages.reduce((acc, item) => [...acc, ...getAllChildPages(pages, item.id)], childPages);
}

export function removePage(id: string) {
	pageStore.update((pages) => {
		const parentPages = getAllParentPages(pages, id).map((item) => item.id);
		const connectedPageIds = getAllChildPages(pages, id).map((item) => item.id);
		const ids = [id, ...connectedPageIds];
		pages.filter((item) => {
			if (parentPages.includes(item.id)) {
				item.connections = item.connections.filter((itemId) => itemId != id);
			}
			return !ids.includes(item.id);
		});
		return pages;
	});
}

export function reset() {
	pageStore.update(() => getDefaultState());
}
