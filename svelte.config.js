// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';
import { importAssets } from 'svelte-preprocess-import-assets';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		mdsvex({
			extensions: ['.md'],
		}),
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer],
			},
			less: {
				prependData: '@import (reference) "src/variables.less";',
			},
		}),
		importAssets(),
		// vitePreprocess(),
	],

	extensions: ['.svelte', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter(),

		// static adapter config
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: false,
			precompress: false,
			strict: true,
		}),
	},
};

export default config;
