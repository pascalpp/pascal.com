<script context="module" lang="ts">
  export type Slide = {
    src: string;
    alt: string;
    description: string;
  };
</script>

<script lang="ts">
  export let slides: Slide[] = [];

  function scrollIntoView(node: HTMLElement) {
    console.log('scrollIntoView');
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  function useScrollIntoView(node: HTMLElement) {
    const onClick = () => scrollIntoView(node);
    node.addEventListener('click', onClick);
    return {
      destroy() {
        node.removeEventListener('click', onClick);
      },
    };
  }
</script>

<div class="slideshow">
  <ul class="slides">
    {#each slides as { src, alt, description }}
      <li class="slide" use:useScrollIntoView>
        <img {src} {alt} loading="lazy" />
        <p>{description}</p>
      </li>
    {/each}
  </ul>
</div>

<style lang="less">
  .slides {
    overflow: hidden;
    overflow-x: auto;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0 1rem;
    scroll-snap-type: x mandatory;
  }
  .slide {
    flex-shrink: 0;
    width: 600px;
    scroll-snap-align: center;
    user-select: none;

    img {
      width: 100%;
      height: auto;
      border: 1px solid rgba(0 0 0 / 0.1);
      box-shadow: 0 2px 4px rgba(0 0 0 / 0.1);
      border-radius: 3px;
    }
  }
</style>
