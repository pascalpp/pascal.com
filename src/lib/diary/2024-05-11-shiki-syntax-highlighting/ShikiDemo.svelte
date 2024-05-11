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
</style>
