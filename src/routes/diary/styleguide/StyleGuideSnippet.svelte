<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getStyleGuideSnippet } from './styleGuideSnippets';

  export let id: string;

  let copied = false;
  let copyFailed = false;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  $: helper = getStyleGuideSnippet(id);

  onDestroy(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  async function copySnippet() {
    if (!helper) return;
    if (resetTimer) clearTimeout(resetTimer);

    try {
      await navigator.clipboard.writeText(helper.snippet);
      copied = true;
      copyFailed = false;
    } catch {
      copied = false;
      copyFailed = true;
    }

    resetTimer = setTimeout(() => {
      copied = false;
      copyFailed = false;
    }, 1800);
  }
</script>

{#if helper}
  <section class="style-guide-snippet" data-snippet-id={helper.id} aria-labelledby={`${helper.id}-snippet-title`}>
    <div class="snippet-header">
      <h3 id={`${helper.id}-snippet-title`}><code>{helper.name}</code></h3>
      <button type="button" class:copied data-copy-snippet={helper.id} on:click={copySnippet}>
        {copied ? 'Copied' : 'Copy snippet'}
      </button>
    </div>

    <p>{helper.description}</p>
    <pre class="snippet"><code>{helper.snippet}</code></pre>

    {#if copyFailed}
      <p class="copy-failed">Copy failed</p>
    {/if}
  </section>
{:else}
  <p class="missing-snippet">
    Missing style guide snippet: <code>{id}</code>
  </p>
{/if}

<style lang="less">
  .style-guide-snippet {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.9rem;
    background-color: rgb(255 255 255 / 0.82);
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 6px;
    font-family: var(--sans-font);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .snippet-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.2;
  }

  p {
    color: rgb(0 0 0 / 0.65);
  }

  button {
    flex: 0 0 auto;
  }

  button.copied {
    background-color: color-mix(in srgb, #d7f4df 82%, white);
    border-color: color-mix(in srgb, #278b46 65%, black);
  }

  .snippet {
    overflow: auto;
    margin: 0;
    padding: 0.75rem;
    border-radius: 4px;
    background-color: rgb(30 36 41);
    color: rgb(246 247 248);
    font-family: var(--mono-font);
    line-height: 1.45;
    white-space: pre-wrap;
  }

  .copy-failed,
  .missing-snippet {
    color: rgb(150 30 30);
  }
</style>
