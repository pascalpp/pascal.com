<script context="module" lang="ts">
  export type Slide = {
    src: string;
    alt: string;
  };
</script>

<script lang="ts">
  export let slides: Slide[] = [];
</script>

<div class="slideshow">
  <ul class="slides">
    {#each slides as { src, alt }, index (src)}
      {@const loading = index === 0 ? undefined : 'lazy'}
      <li class="slide">
        <img {src} {alt} {loading} />
      </li>
    {/each}
  </ul>
</div>

<style lang="less">
  .slideshow {
    margin-left: -1rem;
  }

  .slides {
    overflow: hidden;
    overflow-x: auto;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin: 0;
    padding: 1rem 0.5rem;
    padding-right: 2rem;
    scroll-snap-type: x mandatory;
  }

  .slide {
    flex-shrink: 0;
    scroll-snap-align: center;
    user-select: none;
    max-width: min(78vw, 600px);

    img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 16 / 10;
      border: 1px solid rgba(0 0 0 / 0.2);
      box-shadow: 0 4px 10px rgba(0 0 0 / 0.3);
      border-radius: 8px;
    }
  }
</style>
