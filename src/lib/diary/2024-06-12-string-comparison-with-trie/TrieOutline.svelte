<script lang="ts">
  import { Trie } from './Trie';

  export let trie = new Trie();

  let word = '';

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    trie.insert(word.trim());
    word = '';
    updateTrieOutline();
  }

  let trieOutline = '';

  function updateTrieOutline() {
    trieOutline = JSON.stringify(trie.root, null, 2);
  }
</script>

<div class="trie-outline">
  <form on:submit={onSubmit}>
    <input type="text" placeholder="Enter a word" bind:value={word} />
    <button>Add word</button>
  </form>
  {#if trieOutline}
    <details open>
      <summary>Trie outline</summary>
      <pre>{trieOutline}</pre>
    </details>
  {/if}
</div>

<style lang="less">
  .trie-outline {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form {
    font-family: var(--font-sans);
    font-size: 14px;
    display: flex;
    gap: 0.75em;
  }

  pre {
    font-size: 14px;
  }

  input {
    box-sizing: border-box;
    padding: 0.5em 1em;
    background-color: white;
    color: black;
    border: 1px solid rgb(0 0 0 / 0.3);
    border-radius: 5px;
  }

  button {
    font: inherit;
    padding: 0.5em 1em;
  }
</style>
