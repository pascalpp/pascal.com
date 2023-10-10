<script lang="ts">
  import './diary.less';
  import NavHeader from './NavHeader.svelte';
</script>

<svelte:head>
  <title>Pascal’s Diary</title>

  <style lang="less">
    body {
      background-color: #f0f0f0;
      overflow-x: hidden;
    }
  </style>
</svelte:head>

<div class="diary">
  <div class="structure">
    <NavHeader />
  </div>

  <main>
    <div class="structure">
      <slot />
    </div>
  </main>

  <footer>
    <div class="structure">
      pascal’s diary · copyright about now · <a href="/diary/rss" data-sveltekit-reload>rss</a>
    </div>
  </footer>
</div>

<style lang="less">
  .diary {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    font-family: 'Crimson Pro', serif;
    font-display: block;
    font-weight: 200;
  }

  main {
    flex-grow: 1;
  }

  .structure {
    padding: 1em;
    width: min(95vw, 850px);
    @media @not-mobile {
      padding-left: 250px;
    }
  }

  main .structure {
    width: 95vw;
  }

  footer {
    text-align: center;
    padding-top: 8vh;
    padding-bottom: 2vh;
    color: rgb(0 0 0 / 0.6);
    a {
      text-decoration: none;
    }
  }
</style>
