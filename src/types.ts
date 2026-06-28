declare module '*.md' {
  import type { SvelteComponent } from 'svelte';
  export default class MarkdownComponent extends SvelteComponent {}
  export const metadata: Record<string, string>;
}

declare module 'svelte-json-tree' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {}
}
