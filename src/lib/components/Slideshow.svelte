<script context="module" lang="ts">
  export type Slide = {
    src: string;
    alt: string;
    description: string;
  };
</script>

<script lang="ts">
  import Dialog from './Dialog.svelte';

  export let slides: Slide[] = [];

  let zoomSrc: string | undefined = undefined;
  let zoomAlt: string | undefined = undefined;

  let openZoom = () => {};

  function scrollIntoView(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  function elementIsInView(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const values = [rect.top < 0, rect.bottom > window.innerHeight, rect.left < 0, rect.right > window.innerWidth];
    return !values.some((value) => value);
  }

  function zoomImage(element: HTMLElement) {
    const img = element.querySelector('img');
    zoomSrc = img?.src;
    zoomAlt = img?.alt;
    openZoom();
  }

  function useScrollIntoView(element: HTMLElement) {
    const onClick = () => {
      if (elementIsInView(element)) {
        zoomImage(element);
      } else {
        scrollIntoView(element);
      }
    };

    element.addEventListener('click', onClick);
    return {
      destroy() {
        element.removeEventListener('click', onClick);
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

<Dialog bind:open={openZoom} padded={false}>
  <img src={zoomSrc} alt={zoomAlt} />
</Dialog>

<style lang="less">
  .slideshow {
    width: 100%;
    height: 100%;
  }
  .slides {
    overflow: hidden;
    overflow-x: auto;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
    margin: 0;
    scroll-snap-type: x mandatory;
  }
  .slide {
    flex-shrink: 0;
    width: 60%;
    scroll-snap-align: center;
    user-select: none;

    img {
      width: 100%;
      height: auto;
      border: 1px solid rgba(0 0 0 / 0.3);
      box-shadow: 0 2px 4px rgba(0 0 0 / 0.1);
      border-radius: 3px;
    }
  }
</style>
