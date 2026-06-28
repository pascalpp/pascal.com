import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { metadata } from './changelog.md';

const storageKey = 'settings';

export type AspectRatio = 'landscape' | 'portrait' | 'square';

export type FlowAlignment = 'top' | 'center';

export type Settings = {
  version: string;
  childOpacity: number;
  activePageScale: number;
  aspectRatio: number;
  aspectRatioType: AspectRatio;
  showDescription: boolean;
  cardAnimationSpeed: number;
  flowAlignment: 'top' | 'center';
};

function getDefaultState(): Settings {
  return {
    version: metadata.latest,
    childOpacity: 0.5,
    activePageScale: 1.75,
    aspectRatio: 1.2,
    aspectRatioType: 'landscape' as AspectRatio,
    showDescription: true,
    cardAnimationSpeed: 0.05,
    flowAlignment: 'top',
  };
}

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
      return { ...defaults, ...parsed };
    } catch {
      // don't care
    }
  }
}
