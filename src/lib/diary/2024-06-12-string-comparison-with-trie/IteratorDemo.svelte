<script lang="ts">
  import _ from 'lodash';
  import { iterate } from './iterate';

  export let combinations: string[];
  export let wordList: string[];

  let words: string[] = [];
  let word = '';
  let progress = 0;
  let timer = 0;
  let cancelIterator: (() => void) | undefined = undefined;

  let chunkSize = 1;
  $: chunks = _.chunk(combinations, chunkSize);

  function startIterator() {
    if (!chunks.length) {
      alert('No combinations to check. Fill out the quartile form first.');
      return;
    }

    words = [];

    const interval = setInterval(() => {
      timer++;
    }, 1000);

    cancelIterator = iterate({
      from: 0,
      to: chunks.length,
      action: i => {
        progress = i / chunks.length;
        const chunk = chunks[i];
        word = chunk[0];
        words = [...words, ...chunk.filter(isWord)];
      },
      complete: () => {
        clearInterval(interval);
        word = '';
        cancelIterator = undefined;
        progress = 0;
      },
    });
  }

  function isWord(str: string) {
    return wordList.includes(str);
  }
</script>

<div class="interator-demo">
  <section class="progress">
    <h3>Iterator Demo</h3>
    {#if !progress}
      <label for="chunk-size">Chunk Size: {chunkSize}</label>
      <input id="chunk-size" type="range" min={1} max={10000} step={1} bind:value={chunkSize} />
    {/if}
    {#if progress}
      <p>Checking {combinations.length.toLocaleString()} possible words…</p>
    {/if}
    {#if timer || progress}
      <p>Time elapsed: {timer} seconds{progress ? '…' : '.'}</p>
    {/if}
    {#if cancelIterator}
      <progress value={progress} />
      <p>Checking {word}…</p>
    {/if}
    {#if words.length}
      <details>
        <summary>Words: {words.length}</summary>
        <div class="words">
          {#each words as word}
            <div>{word}</div>
          {/each}
        </div>
      </details>
    {/if}
    {#if !progress}
      <p><button on:click={startIterator}>Check for words</button></p>
    {:else if cancelIterator}
      <p><button on:click={cancelIterator}>Cancel</button></p>
    {/if}
  </section>
</div>

<style lang="less">
  .interator-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  .progress {
    font-family: var(--font-sans);
    font-weight: 400;
    font-size: 16px;
    padding: 1rem 1.5rem;
    background-color: hsl(60, 80%, 95%);
    border-radius: 0.5rem;
    border: 1px solid rgba(0 0 0 /0.3);
    justify-content: center;
    align-items: center;
    width: max-content;
  }

  summary {
    text-align: center;
  }

  .words {
    margin-top: 0.5rem;
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 1rem;
    max-width: 600px;
    line-height: 2;
  }
</style>
