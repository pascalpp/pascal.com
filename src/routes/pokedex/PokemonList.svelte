<script lang="ts">
  import PokemonListSection from './PokemonListSection.svelte';

  export let names: string[];
  export let name: string;
  export let search: string;

  $: filteredNames = search ? names.filter((name: string) => name.includes(search)) : names;
  $: letters = Array.from(new Set(filteredNames.map((name: string) => name[0].toUpperCase())));

  $: console.log(search, filteredNames.length);
</script>

<div class="pokemon-list">
  <ul class="index">
    {#each letters as letter}
      <PokemonListSection {letter} names={filteredNames} {name} />
    {/each}
  </ul>
  <!-- <Rolodex {letters} /> -->
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
</style>
