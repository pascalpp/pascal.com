import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import tutorialFlow from './tutorial-flow.json';

const storageKey = 'pages';

export type PageId = string;

export interface PageInfo {
	title?: string;
	description?: string;
	connections?: PageId[];
	active?: boolean;
}

export interface Page {
	id: PageId;
	title: string;
	description: string;
	connections: PageId[];
	active?: boolean;
}

const pageDefaults = {
	title: '',
	description: '',
	connections: [],
};

export const pageStore = writable<Page[]>([]);

if (browser) {
	const state = getStoredState() || getTutorialState();
	const sanitized = sanitizePages(state);
	pageStore.set(sanitized);

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

export function addPage(pageInfo: PageInfo = {}): Page {
	const id = uuidv4();
	const page = { id, ...pageDefaults, ...pageInfo };
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
		const rootPage = { id: 'root', title: 'Root Card', description: '', connections: rootChildrenIds };
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
		const parentPageIds = parentPages.map((item) => item.id);
		const activePageIds = [id, ...parentPageIds];
		return pages.map((item) => {
			item.active = activePageIds.includes(item.id);
			return item;
		});
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
		const connectedPageIds = getAllChildPages(pages, id).map((item) => item.id);
		const idsToRemove = [id, ...connectedPageIds];
		return pages.filter((item) => {
			item.connections = item.connections.filter((itemId) => !idsToRemove.includes(itemId));
			return !idsToRemove.includes(item.id);
		});
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

export function movePageUp(id: PageId) {
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(id));
		const grandparent = parent && pages.find((item) => item.connections.includes(parent.id));
		if (grandparent) {
			const parentIndex = grandparent.connections.indexOf(parent.id);
			grandparent.connections.splice(parentIndex + 1, 0, id);
			parent.connections = parent.connections.filter((itemId) => itemId != id);
		}
		return pages;
	});
}

export function replaceEmptyParent(childId: PageId) {
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(childId));
		const grandparent = parent && pages.find((item) => item.connections.includes(parent.id));
		if (grandparent) {
			const parentIndex = grandparent.connections.indexOf(parent.id);
			console.log('grandparent before', grandparent.connections);
			grandparent.connections = [
				...grandparent.connections.slice(0, parentIndex),
				childId,
				...grandparent.connections.slice(parentIndex + 1),
			];
			console.log('grandparent after', grandparent.connections);

			parent.connections = parent.connections.filter((itemId) => itemId != childId);
		}

		if (parent && !parent.title && !parent.description) {
			pages = pages.filter((item) => {
				item.connections = item.connections.filter((itemId) => itemId !== parent.id);
				return item.id !== parent.id;
			});
		}

		return pages;
	});
}

export function addParentAbovePage(childId: PageId): Page {
	const newParent = addPage();
	pageStore.update((pages) => {
		const oldParent = pages.find((item) => item.connections.includes(childId));
		if (oldParent) {
			const index = oldParent.connections.indexOf(childId) ?? 0;
			oldParent.connections = [
				...oldParent.connections.slice(0, index),
				newParent.id,
				...oldParent.connections.slice(index + 1),
			];
		} else {
			// the page being moved down is the top-most page, so put the new parent first
			pages = [newParent, ...pages.filter((item) => item.id !== newParent.id)];
		}
		newParent.connections = [childId];
		return pages;
	});
	return newParent;
}

export function movePageDown(id: PageId): Page | undefined {
	let newParent;
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(id));
		if (parent) {
			const index = parent.connections.indexOf(id) ?? 0;
			const newParentId = index > 0 ? parent?.connections[index - 1] : parent?.connections[index + 1];
			newParent = pages.find((item) => item.id === newParentId);
			if (newParent) {
				newParent.connections.push(id);
				parent.connections = parent.connections.filter((itemId) => itemId != id);
			}
		}
		return pages;
	});
	return newParent;
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

export function loadTutorial(): PageId | undefined {
	let tutorialStartPageId;

	pageStore.update((pages) => {
		const tutorial = getTutorialState();
		const tutorialRoot = tutorial.find((item) => item.id === 'root');
		const tutorialPages = tutorial.filter((item) => item.id !== 'root');
		tutorialStartPageId = tutorialRoot?.connections[0];
		if (!tutorialStartPageId) throw new Error('Error loading tutorial. Root page not found.');

		const root = pages.find((item) => item.id === 'root');
		root?.connections.unshift(tutorialStartPageId);
		return sanitizePages([...pages, ...tutorialPages]);
	});

	return tutorialStartPageId;
}

function getStoredState(): Page[] | undefined {
	if (browser) {
		try {
			const state = window?.localStorage.getItem(storageKey);
			const parsed = state && JSON.parse(state);
			return parsed;
		} catch {
			// don't care
		}
	}
}

function sanitizePages(pages: Page[]): Page[] {
	const filtered = pages.map((page) => {
		page.title = page.title ?? '';
		page.description = page.description ?? '';
		page.connections = Array.from(new Set(page.connections.filter((id) => pages.some((item) => item.id === id))));
		page.active = page.active ?? false;
		return page;
	});

	const ids = new Set();
	const deduped = filtered.filter((page) => {
		if (ids.has(page.id)) {
			return false;
		} else {
			ids.add(page.id);
			return true;
		}
	});

	return deduped;
}

function getTutorialState(): Page[] {
	return tutorialFlow;
}

function getDefaultState(): Page[] {
	const firstPageId = uuidv4();
	return [
		{ id: 'root', title: 'Root Card', description: '', connections: [firstPageId], active: true },
		{ id: firstPageId, title: '', description: '', connections: [], active: true },
	];
}
