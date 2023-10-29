<script lang="ts">
  import { browser } from '$app/environment';

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
    if (window.innerWidth > 768) {
      requestAnimationFrame(() => {
        const active = document.querySelector('li.active') as HTMLElement;
        scrollToElementIfNeeded(active);
      });
    }
  }

  $: browser && name && scrollToActiveItem();
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
    // dark divider idea, for when have a filter field
    // background-color: #333;
    // color: white;
    // border-radius: 4px;
    // font-size: 12px;

    background-color: white;
    margin-left: -1.5rem;
    padding-left: 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-transform: capitalize;
    position: sticky;
    top: 1rem;
    margin-bottom: 0.5rem;
    z-index: 1;
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
