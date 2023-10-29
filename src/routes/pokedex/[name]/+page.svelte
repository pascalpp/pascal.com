<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  const name = data.pokemon.name.replace('-', ' ');
</script>

<div>
  <h1>{name}</h1>

  <img src={data.pokemon.sprites.other['official-artwork'].front_default} alt={name} />

  <details>
    <summary>Raw data</summary>
    <pre>{JSON.stringify(data.pokemon, null, 2)}</pre>
  </details>
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

  img {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 1;
    margin: 0 auto;
    display: block;
  }
</style>
