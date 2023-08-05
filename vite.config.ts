import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import svelteSVG from 'vite-plugin-svelte-svg';
import { plugin as markdownPlugin } from 'vite-plugin-markdown';
import { Mode } from 'vite-plugin-markdown';

export default defineConfig({
	plugins: [
		sveltekit(),
		svelteSVG({
			svgoConfig: {},
			requireSuffix: true,
		}),
		markdownPlugin({
			mode: [Mode.HTML, Mode.TOC],
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
