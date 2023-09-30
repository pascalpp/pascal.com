// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

declare module '*.md' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, string>;
}

declare module '*.svg?component' {
  import type { SvelteComponent } from 'svelte';

  export default class Comp extends SvelteComponent {}
}
