<script lang="ts">
  import { onMount } from 'svelte';

  export let names: string[];
  export let letter: string;
  export let name: string;

  const items = names.filter((name: string) => name[0].toUpperCase() === letter.toUpperCase());

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
    const active = document.querySelector('li.active') as HTMLElement;
    scrollToElementIfNeeded(active);
  }

  $: name && scrollToActiveItem();
</script>

<li class="divider">{letter}</li>
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

  li.active {
    font-weight: 600;
    position: relative;
    &:before {
      content: '→ ';
      color: @blue;
      position: absolute;
      right: 100%;
    }
  }
</style>
