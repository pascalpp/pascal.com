import assert from 'assert';
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
	focus?: boolean;
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

export function addConnection(page: Page, pageInfo: PageInfo): Page {
	const connection = addPage(pageInfo);
	updatePage({ ...page, connections: [...page.connections, connection.id] });
	return connection;
}

export function activatePage(pageId: PageId) {
	pageStore.update((pages) => {
		const parentPages = getAllParentPages(pages, pageId);
		const parentPageIds = parentPages.map((item) => item.id);
		const activePageIds = [pageId, ...parentPageIds];
		return pages.map((item) => {
			item.active = activePageIds.includes(item.id);
			return item;
		});
	});
}

export function deactivatePage(pageId: PageId) {
	pageStore.update((pages) => {
		const page = pages.find((item) => item.id === pageId);
		assert(page, 'Page not found');

		const childPages = getAllChildPages(pages, pageId);
		const childPageIds = childPages.map((item) => item.id);
		const idsToDeactivate = [pageId, ...childPageIds];
		return pages.map((item) => {
			if (idsToDeactivate.includes(item.id)) {
				item.active = false;
			}
			return item;
		});
	});
}

export function focusPage(pageId?: PageId) {
	pageStore.update((pages) => {
		return pages.map((item) => {
			item.focus = item.id === pageId;
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

export function reorderPage(childId: PageId, direction: 'up' | 'down') {
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(childId));
		assert(parent, 'Parent not found');

		const currentIndex = parent.connections.indexOf(childId);
		const vector = direction === 'up' ? -1 : +1;
		const maxIndex = parent.connections.length - 1;
		const newIndex = Math.min(Math.max(currentIndex + vector, 0), maxIndex);
		parent.connections = changeItemIndex(parent.connections, currentIndex, newIndex);

		return pages;
	});
}

export function movePageUp(id: PageId) {
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(id));
		assert(parent, 'Parent not found');

		const grandparent = pages.find((item) => item.connections.includes(parent.id));
		assert(grandparent, 'Grandparent not found');

		const parentIndex = grandparent.connections.indexOf(parent.id);
		// grandparent.connections.splice(parentIndex + 1, 0, id);

		// put child in grandparent's connections, after parent
		grandparent.connections = [
			...grandparent.connections.slice(0, parentIndex + 1),
			id,
			...grandparent.connections.slice(parentIndex + 1),
		];

		// remove child from parent's connections
		parent.connections = parent.connections.filter((itemId) => itemId != id);

		return pages;
	});
}

export function replaceEmptyParent(childId: PageId) {
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(childId));
		assert(parent, 'Parent not found');

		const grandparent = pages.find((item) => item.connections.includes(parent.id));
		assert(grandparent, 'Grandparent not found');

		const emptyParent = !parent.title && !parent.description;
		if (!emptyParent) return pages;

		// put child in grandparent's connections where parent was
		const parentIndex = grandparent.connections.indexOf(parent.id);
		grandparent.connections = [
			...grandparent.connections.slice(0, parentIndex),
			childId,
			...grandparent.connections.slice(parentIndex + 1),
		];
		const childIndex = grandparent.connections.indexOf(childId);
		assert(childIndex === parentIndex, 'Child not in expected position');

		// remove parent
		pages = pages.filter((item) => {
			return item.id !== parent.id;
		});
		assert(!pages.some((item) => item.connections.includes(parent.id)), 'Parent still exists in pages');

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

export function movePageDown(childId: PageId): Page {
	let newParent;
	pageStore.update((pages) => {
		const parent = pages.find((item) => item.connections.includes(childId));
		assert(parent, 'Parent not found');

		// find nearest sibling in parent connections
		const index = parent.connections.indexOf(childId);
		const nearestSiblingId = index > 0 ? parent.connections[index - 1] : parent.connections[index + 1];
		assert(nearestSiblingId, 'Nearest sibling not found');
		assert(nearestSiblingId !== childId, 'Nearest sibling is same as child');

		// find nearest sibling page and use as new parent
		newParent = pages.find((item) => item.id === nearestSiblingId);
		assert(newParent, 'New parent not found');

		// add child to new parent connections
		newParent.connections = [...newParent.connections, childId];

		// remove child from old parent connections
		parent.connections = parent.connections.filter((itemId) => itemId != childId);

		return pages;
	});

	assert(newParent, 'New parent not found');
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
