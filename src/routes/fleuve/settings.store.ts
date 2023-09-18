import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { metadata } from './changelog.md';

const storageKey = 'settings';

export type AspectRatio = 'landscape' | 'portrait' | 'square';

export type Settings = {
	version: string;
	childOpacity: number;
	activePageScale: number;
	aspectRatioType: AspectRatio;
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
			return state && JSON.parse(state);
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
		aspectRatioType: 'landscape' as AspectRatio,
	};
}
