<script lang="ts">
  /* eslint-disable svelte/no-navigation-without-resolve */
  import './diary.less';
  import NavHeader from './NavHeader.svelte';
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Pascal’s Diary" href="/diary/rss" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,500;1,200;1,500&display=swap"
  />

  <style lang="less">
    :root,
    body {
      background-color: #f0f0f0;
    }

    body {
      overflow-x: hidden;
    }
  </style>
</svelte:head>

<div class="diary">
  <NavHeader />

  <main class="content-grid">
    <slot />
  </main>

  <footer class="content-grid">
    <p>
      pascal’s diary · copyright about now · <a href="/diary/rss" data-sveltekit-reload>rss</a>
    </p>
  </footer>
</div>

<style lang="less">
  .diary {
    padding-top: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  main {
    flex-grow: 1;
  }

  footer {
    text-align: center;
    padding-top: 8vh;
    padding-bottom: 4vh;
    color: rgb(0 0 0 / 0.6);
    a {
      text-decoration: none;
    }
  }
</style>
