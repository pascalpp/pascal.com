<script lang="ts">
  import PokemonListSection from './PokemonListSection.svelte';

  export let names: string[];
  export let name: string;
  export let search: string;

  $: filteredNames = search ? names.filter((name: string) => name.toLowerCase().includes(search.toLowerCase())) : names;
  $: letters = Array.from(new Set(filteredNames.map((name: string) => name[0].toUpperCase())));
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
