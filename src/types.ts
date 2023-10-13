declare module '*.md' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, string>;
}

declare module '*.svg?component' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {}
}
