<script lang="ts">
  export let combinations: string[];
  export let wordList: string[];

  interface IteratorProps {
    from: number;
    to: number;
    action: (n: number) => void;
    complete: () => void;
  }

  function iterate({ from, to, action, complete }: IteratorProps) {
    let i = from;
    let canceled = false;
    const runAction = () => {
      action(i);
      i++;
      if (i < to && !canceled) {
        setTimeout(runAction, 1);
      } else {
        complete();
      }
    };
    runAction();
    return () => {
      canceled = true;
    };
  }

  let words: string[] = [];
  let word = '';
  let progress = 0;
  let timer = 0;
  let cancelIterator: (() => void) | undefined = undefined;

  function startIterator() {
    words = [];

    const interval = setInterval(() => {
      timer++;
    }, 1000);

    cancelIterator = iterate({
      from: 0,
      to: combinations.length,
      action: i => {
        progress = i / combinations.length;
        word = combinations[i];
        if (wordList.includes(word)) {
          words = [...words, word];
        }
      },
      complete: () => {
        clearInterval(interval);
        console.timeEnd('go');
        console.log('Done');
        word = '';
        cancelIterator = undefined;
        progress = 0;
      },
    });
  }
</script>

<div class="interator-demo">
  <section class="progress">
    <h3>Iterator Demo</h3>
    {#if progress}
      <p>Checking {combinations.length} possible words…</p>
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
