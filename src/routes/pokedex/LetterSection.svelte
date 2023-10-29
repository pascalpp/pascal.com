<script lang="ts">
  export let names: string[];
  export let letter: string;

  const letterNames = names.filter((name: string) => name[0].toUpperCase() === letter.toUpperCase());
</script>

<div class="divider">{letter}</div>
{#each letterNames as name}
  <div class="name">
    <a href="/pokedex/{name}">
      {name.replace('-', ' ')}
    </a>
  </div>
{/each}

<style lang="less">
  .divider {
    background-color: white;
    padding: 0 1rem;
    margin-left: -1rem;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-transform: capitalize;
    position: sticky;
    top: 0;
    margin-bottom: 0.5rem;
  }
</style>
