declare module '*.md' {
  import type { Component } from 'svelte';
  const MarkdownComponent: Component;
  export default MarkdownComponent;
  export const metadata: Record<string, string>;
}
