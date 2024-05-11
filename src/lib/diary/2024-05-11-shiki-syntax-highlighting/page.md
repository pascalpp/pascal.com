---
title: Shiki Syntax Highlighting
date: 2024-05-11T18:40:38.297Z
status: draft
---

<script lang="ts">
  import ShikiDemo from './ShikiDemo.svelte';
  import OtherDemo from './OtherDemo.svelte';
  import code from './ShikiDemo.svelte?raw';
</script>

<!-- <OtherDemo/> -->

```svelte {2,6}
<script lang="ts">
  import { getHighlighter } from 'shiki';
  import code2 from './ShikiDemo.svelte?raw';

  let html = '';

  (async () => {
    const highlighter = await getHighlighter({
      themes: ['one-dark-pro'],
      langs: ['ts', 'svelte'],
    });

    html = highlighter.codeToHtml(code2, {
      lang: 'svelte',
      theme: 'one-dark-pro',
    });
  })();
</script>

<div class="my-component">
  {@html html}
</div>

<style lang="less">
  .my-component {
    color: inherit;
  }

  :global(code) {
    counter-reset: step;
    counter-increment: step 0;
  }

  :global(code .line::before) {
    content: counter(step);
    counter-increment: step;
    width: 5em;
    margin-right: 1.5em;
    display: inline-block;
    text-align: right;
    color: white;
    background-color: black;
    opacity: 0.7;
  }

  :global(code .line:only-child::before) {
    content: none;
  }
</style>
```

<ShikiDemo/>
