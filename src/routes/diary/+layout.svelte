<script>
  import './diary.less';

  export let data;
  $: ({ pathname } = data);
  $: isIndex = /^\/diary\/?$/.test(pathname);
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

<div class="blog">
  <div class="structure">
    <nav>
      <div class="card">
        <h1>
          {#if isIndex}
            <span class="title">Pascal’s Diary</span>
          {:else}
            <a href="/diary">Pascal’s Diary</a>
          {/if}
        </h1>
        <a href="/">⬅ Home</a>
      </div>
    </nav>
  </div>

  <main>
    <div class="structure">
      <slot />
    </div>
  </main>

  <footer>
    <div class="structure">pascal’s diary · copyright about now</div>
  </footer>
</div>

<style lang="less">
  .blog {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    font-family: 'Crimson Pro', serif;
    font-display: block;
    font-weight: 200;
    // animation: zoom-fade 1.5s ease-out 0ms forwards;
    // transform-origin: top left;
  }

  main {
    flex-grow: 1;
  }

  :global(a) {
    color: steelblue;
    text-underline-offset: 0.15em;
    text-decoration-thickness: 1px;
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

  nav {
    --deg: -2deg;
    .rotated-shadow;
    margin: 0 auto;
    @media @not-mobile {
      width: max-content;
      position: fixed;
      left: -1.75vw;
      top: 5vh;
    }

    .card {
      background-color: rgb(255 255 255);
      padding: 1em;
      border-radius: 4px;

      @media @not-mobile {
        padding-top: 1em;
        padding-left: 3vw;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      @media @mobile {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        gap: 3em;
        padding-top: 3em;
        padding-left: 2em;
        margin-left: -2em;
        margin-top: -2em;
      }
    }

    a {
      text-decoration: none;
      color: @blue;
    }
    h1 {
      font-weight: 500;
      font-size: 24px;
      color: black;
    }
    a[href='/'] {
      font-family: @sans-font;
    }
  }

  @keyframes zoom-fade {
    0% {
      opacity: 0;
      scale: 10;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }

  footer {
    text-align: center;
    padding-top: 8vh;
    padding-bottom: 2vh;
    color: rgb(0 0 0 / 0.3);
  }
</style>
