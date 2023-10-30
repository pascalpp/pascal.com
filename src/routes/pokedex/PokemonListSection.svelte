<script lang="ts">
  export let names: string[];
  export let letter: string;
  export let name: string;

  $: items = names.filter((name: string) => name[0].toUpperCase() === letter.toUpperCase());
</script>

<li class="divider" id={letter.toUpperCase()}>{letter}</li>
{#each items as item}
  {@const active = item === name}
  <li class="name" class:active>
    <a href="/pokedex/{item}">
      {item.replace('-', ' ')}
    </a>
  </li>
{/each}

<style lang="less">
  .divider {
    background-color: #dfdfdf;
    color: #666;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin: 0;

    margin-left: -1.5rem;
    padding: 0.25rem 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-transform: capitalize;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    &:first-child {
      margin-top: 0;
    }
  }

  li.active {
    font-weight: 600;
    position: relative;
    &:before {
      content: '→';
      color: @blue;
      position: absolute;
      right: 100%;
      margin-right: 0.25rem;
    }
  }
</style>
