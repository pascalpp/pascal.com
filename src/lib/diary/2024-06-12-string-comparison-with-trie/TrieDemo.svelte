<script lang="ts">
  import { Trie } from './Trie';

  export let combinations: string[];
  export let wordList: string[];
  export let words: string[] = [];
  export let timeElapsed = 'h';

  const trie = new Trie();
  wordList.forEach(word => trie.insert(word));

  function wordExists(word: string) {
    return trie.check(word);
  }

  function checkWords() {
    const start = performance.now();
    words = combinations.filter(wordExists).sort();
    const end = performance.now();
    timeElapsed = ((end - start) / 1000).toFixed(2);
  }
</script>

<div class="trie-demo">
  <section class="progress">
    <h3>Trie Demo</h3>
    {#if timeElapsed}
      <p>Checked {combinations.length.toLocaleString()} possible words in {timeElapsed} seconds.</p>
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
    <p><button on:click={checkWords}>Check for words</button></p>
  </section>
</div>

<style lang="less">
  .trie-demo {
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
