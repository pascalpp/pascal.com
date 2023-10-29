<script lang="ts">
  import LetterSection from './PokemonListSection.svelte';
  import Rolodex from './Rolodex.svelte';

  export let names: string[];
  export let name: string;

  const letters: string[] = Array.from(new Set(names.map((name: string) => name[0].toUpperCase())));
</script>

<div class="pokemon-list">
  <ul class="index">
    {#each letters as letter}
      <LetterSection {letter} {names} {name} />
    {/each}
  </ul>
  <!-- <Rolodex {letters} /> -->
</div>

<style lang="less">
  .pokemon-list {
    position: relative;
  }

  .index {
    padding: 1rem;
    padding-top: 0rem;
    padding-right: 0rem;
    margin-top: 1rem;
    text-transform: capitalize;
    line-height: 1.8;
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 300;
    list-style: none;
  }
</style>
