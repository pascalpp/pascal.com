import adapter from '@sveltejs/adapter-vercel';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';
import { importAssets } from 'svelte-preprocess-import-assets';
import { mdsvex } from 'mdsvex';
import remarkAttr from 'remark-attr';
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [remarkAttr],
    }),
    sveltePreprocess({
      postcss: {
        plugins: [autoprefixer, postcssJitProps(OpenProps)],
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
    adapter: adapter({
      runtime: 'nodejs22.x',
    }),
  },

  vitePlugin: {
    inspector: {
      toggleKeyCombo: 'control-shift',
    },
  },
};

export default config;
