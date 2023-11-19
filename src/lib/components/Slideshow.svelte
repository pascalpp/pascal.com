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
    zoomDialog.open();
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

  let zoomDialog: Dialog;
</script>

<div class="slideshow">
  <ul class="slides">
    {#each slides as { src, alt, description }, index (src)}
      {@const loading = index === 0 ? undefined : 'lazy'}
      <li class="slide" use:useScrollIntoView>
        <img {src} {alt} {loading} />
        <p>{description}</p>
      </li>
    {/each}
  </ul>

  <Dialog bind:this={zoomDialog} padded={false}>
    <img src={zoomSrc} alt={zoomAlt} class="zoom-image" loading="lazy" />
  </Dialog>
</div>

<style lang="less">
  .slideshow {
    width: 100%;
    --dialog-background-color: white;
    --dialog-color: black;
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
    aspect-ratio: 20 / 17;
    scroll-snap-align: center;
    user-select: none;

    img {
      max-width: min(70vw, 1000px);
      max-height: 70vh;
      height: auto;
      aspect-ratio: var(--slide-aspect-ratio);
      border: 1px solid rgba(0 0 0 / 0.2);
      box-shadow: 0 4px 10px rgba(0 0 0 / 0.3);
      border-radius: 8px;
    }
  }

  .zoom-image {
    max-width: min(95vw, 1600px);
    max-height: 95vh;
    height: auto;
    aspect-ratio: var(--slide-aspect-ratio);
  }
</style>
