import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), svg()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  define: {
    'process.env': {},
  },
});
