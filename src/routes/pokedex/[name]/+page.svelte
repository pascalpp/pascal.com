<script lang="ts">
  import type { PageData } from './$types';
  import JSONTree from 'svelte-json-tree';

  export let data: PageData;

  const name = data.pokemon.name.replace('-', ' ');

  function findImages(obj: any): string[] {
    const images: string[] = [];
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string' && /^http.*\.png$/.test(value)) {
        images.push(value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => images.push(...findImages(v)));
      } else if (typeof value === 'object') {
        images.push(...findImages(value));
      }
    }
    return images;
  }

  $: preferredImage = data.pokemon.sprites.other['official-artwork'].front_default;
  $: images = Array.from(new Set([preferredImage, ...findImages(data.pokemon)])).filter(Boolean);
</script>

<svelte:head>
  {#if images[0]}
    <meta property="og:image" content={images[0]} />
  {/if}
</svelte:head>

<div>
  <h1>{name}</h1>

  {#if images.length > 0}
    <div class="preferred-image">
      <img src={images[0]} alt={name} />
    </div>
    {#if images.length > 1}
      <details>
        <summary>More images</summary>
        <div class="images">
          {#each images.slice(1) as image}
            <div class="image">
              <img src={image} alt={name} />
            </div>
          {/each}
        </div>
      </details>
    {/if}
  {:else}
    <h3>No images available</h3>
  {/if}

  <div class="data">
    <details>
      <summary>Raw data</summary>
      <JSONTree value={data.pokemon} defaultExpandedLevel={1} />
    </details>
  </div>
</div>

<style lang="less">
  h1 {
    font-size: 36px;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
    position: sticky;
    top: 0;
    @media @mobile {
      text-align: center;
    }
  }

  h3 {
    margin-top: 1rem;
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .image {
      width: 200px;
    }
  }

  img {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    aspect-ratio: 1;
    display: block;
  }

  .data {
    margin: 2rem 0;
    --json-tree-font-size: 16px;
  }
</style>
