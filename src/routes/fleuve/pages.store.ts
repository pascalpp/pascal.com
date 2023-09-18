import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import defaultFlow from './default-flow.json';

const storageKey = 'pages';

export type PageId = string;

export interface PageInfo {
	title?: string;
	description?: string;
	image?: string;
	active?: boolean;
}

export interface Page extends PageInfo {
	id: PageId;
	connections: PageId[];
}

export const pageStore = writable<Page[]>(getStoredState() || getDefaultState());

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

export function addRootPage() {
	pageStore.update((pages) => {
		const rootChildren = pages.filter((page) => !pages.some((item) => item.connections.includes(page.id)));
		const rootChildrenIds = rootChildren.map((item) => item.id);
		const rootPage = { id: 'root', title: 'Root Card', connections: rootChildrenIds };
		return [rootPage, ...pages];
	});
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

export function removePage(id: PageId) {
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

export function reorderPage(id: PageId, direction: 'up' | 'down') {
	pageStore.update((pages) => {
		const parentPage = pages.find((item) => item.connections.includes(id));
		if (parentPage) {
			const index = parentPage.connections.indexOf(id);
			const directionIndex = direction === 'up' ? index - 1 : index + 1;
			const normalizedIndex = Math.min(Math.max(directionIndex, 0), parentPage.connections.length - 1);
			parentPage.connections = changeItemIndex(parentPage.connections, index, normalizedIndex);
		}
		return pages;
	});
}

function changeItemIndex(array: PageId[], from: number, to: number) {
	// remove `from` item and store it
	const item = array.splice(from, 1)[0];
	// insert stored item into position `to`
	array.splice(to, 0, item);
	return array;
}

export function reset() {
	pageStore.update(() => getDefaultState());
}

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
	return defaultFlow;
}
