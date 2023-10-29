<script lang="ts">
  import LetterSection from './PokemonListSection.svelte';

  export let names: string[];
  export let name: string;

  const letters: string[] = Array.from(new Set(names.map((name: string) => name[0].toUpperCase())));
</script>

<ul class="index">
  {#each letters as letter}
    <LetterSection {letter} {names} {name} />
  {/each}
</ul>

<style lang="less">
  .index {
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
    list-style: none;
  }
</style>
