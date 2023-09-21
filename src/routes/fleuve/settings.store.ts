import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { metadata } from './changelog.md';

const storageKey = 'settings';

export type AspectRatio = 'landscape' | 'portrait' | 'square';

export type Settings = {
	version: string;
	childOpacity: number;
	activePageScale: number;
	aspectRatio: number;
	aspectRatioType: AspectRatio;
	showDescription: boolean;
};

export const settings = writable<Settings>(getStoredState() || getDefaultState());

if (browser) {
	settings.subscribe((data) => {
		window?.localStorage.setItem(storageKey, JSON.stringify(data));
	});
}

function getStoredState(): Settings | undefined {
	if (browser) {
		try {
			const state = window?.localStorage.getItem(storageKey);
			const parsed = state && JSON.parse(state);
			const defaults = getDefaultState();
			const merged = { ...defaults, ...parsed };
			return {
				...merged,
				activePageScale: Math.max(1, Math.min(3, merged.activePageScale)),
				aspectRatio: Math.max(0.75, Math.min(2, merged.aspectRatio)),
				childOpacity: Math.max(0, Math.min(1, merged.childOpacity)),
				showDescription: true,
			};
		} catch {
			// don't care
		}
	}
}

function getDefaultState(): Settings {
	return {
		version: metadata.latest,
		childOpacity: 0.5,
		activePageScale: 0.3,
		aspectRatio: 1.2,
		aspectRatioType: 'landscape' as AspectRatio,
		showDescription: false,
	};
}
