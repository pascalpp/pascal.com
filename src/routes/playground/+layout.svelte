<script lang="ts">
  import Navlink from './Navlink.svelte';
  import { page } from '$app/stores';

  $: path = $page.url.pathname;
</script>

<div class="playground">
  <nav>
    <Navlink href="/" label="Home" />
    <Navlink {path} href="/playground/modals" label="Modals" />
    <Navlink {path} href="/playground/buttons" label="Buttons" />
    <Navlink {path} href="/playground/layers" label="Layers" />
    <Navlink {path} href="/playground/badges" label="Badges" />
    <Navlink {path} href="/playground/toast" label="Toast" />
    <Navlink {path} href="/playground/code" label="Code" />
  </nav>
  <main>
    <slot />
  </main>
</div>

<style lang="less">
  .playground {
    :global(h1) {
      font-size: 1.5em;
      margin: 0;
    }

    nav {
      position: sticky;
      top: 0;
      z-index: 1;
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2em;
      padding: 16px 20px;
      border-bottom: 1px solid fade(black, 10%);
      background-color: white;
      box-sizing: border-box;
      margin: 0;

      :global(.button.active) {
        border-bottom: 1px solid;
      }
    }

    main {
      padding: 20px;
      padding-bottom: 100px;
    }
  }
</style>
