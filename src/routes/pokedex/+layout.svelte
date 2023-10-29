<script lang="ts">
  import './pokedex.less';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import LetterSection from './LetterSection.svelte';
  import { goto } from '$app/navigation';

  export let data: LayoutData;

  const names = data.names;
  const letters: string[] = Array.from(new Set(names.map((name: string) => name[0].toUpperCase())));

  $: currentName = data.pokemon?.name;
  $: currentIndex = names.indexOf(currentName);
  $: nextName = names[currentIndex + 1];
  $: previousName = names[currentIndex - 1];

  function onKeypress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && nextName) {
      goto(`/pokedex/${nextName}`);
    } else if (event.key === 'ArrowLeft' && previousName) {
      goto(`/pokedex/${previousName}`);
    } else if (event.key === 'r') {
      goto('/pokedex');
    }
  }

  onMount(() => {
    document.addEventListener('keydown', onKeypress);
    return () => document.removeEventListener('keydown', onKeypress);
  });
</script>

<main>
  <div class="results">
    {#each letters as letter}
      <LetterSection {letter} {names} />
    {/each}
  </div>
  <div class="content">
    {#key data.pokemon?.name}
      <nav>
        <ul>
          <li>
            {#if previousName}
              <a href="/pokedex/{previousName}">{previousName.replace('-', ' ')}</a>
            {/if}
          </li>
          <li>
            <a href="/pokedex/">Random</a>
          </li>
          <li>
            {#if nextName}
              <a href="/pokedex/{nextName}">{nextName.replace('-', ' ')}</a>
            {/if}
          </li>
        </ul>
      </nav>
      <slot />
    {/key}
  </div>
</main>

<style lang="less">
  main {
    display: flex;
    max-height: 100vh;
    align-items: stretch;
  }

  .results {
    padding: 1rem 2rem;
    padding-top: 0rem;
    padding-right: 1rem;
    margin-top: 1rem;
    max-height: 100vh;
    overflow: scroll;
    text-transform: capitalize;
    line-height: 1.8;
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 300;
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;

    nav {
      ul {
        list-style: none;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        font-size: 18px;
        margin-bottom: 1rem;
      }
      a {
        text-transform: capitalize;
      }
      li {
        width: 33%;
        text-align: center;
      }
      li:first-child {
        text-align: left;
        a:before {
          content: '← ';
        }
      }
      li:last-child {
        text-align: right;
        a:after {
          content: ' →';
        }
      }
    }
  }
</style>
