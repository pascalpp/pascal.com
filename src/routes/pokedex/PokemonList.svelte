<script lang="ts">
  import { browser } from '$app/environment';
  import PokemonListSection from './PokemonListSection.svelte';

  export let names: string[];
  export let name: string;
  export let search: string;

  $: filteredNames = search ? names.filter((name: string) => name.toLowerCase().includes(search.toLowerCase())) : names;
  $: letters = Array.from(new Set(filteredNames.map((name: string) => name[0].toUpperCase())));

  function scrollToElementIfNeeded(element: HTMLElement | undefined | null): HTMLElement | undefined {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const values = [rect.top < 50, rect.bottom > window.innerHeight, rect.left < 0, rect.right > window.innerWidth];
    if (values.some((value) => value)) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return element;
  }

  function scrollToActiveItem() {
    if (window.innerWidth > 768) {
      requestAnimationFrame(() => {
        const active = document.querySelector('li.active') as HTMLElement;
        scrollToElementIfNeeded(active);
      });
    }
  }

  $: browser && name && scrollToActiveItem();
</script>

<div class="pokemon-list">
  {#if letters.length > 0}
    <ul class="index">
      {#each letters as letter}
        <PokemonListSection {letter} names={filteredNames} {name} />
      {/each}
    </ul>
  {:else}
    <p class="no-matches"><em>No matching Pokémon!</em></p>
  {/if}
</div>

<style lang="less">
  .pokemon-list {
    position: relative;
  }

  .index {
    margin: 0;
    padding: 0 1.5rem;
    padding-right: 0rem;
    text-transform: capitalize;
    line-height: 1.8;
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 300;
    list-style: none;
  }

  .no-matches {
    text-align: center;
    font-style: italic;
    color: #666;
    margin-top: 0.5rem;
  }
</style>
