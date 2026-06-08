<script lang="ts">
  /* eslint-disable svelte/no-navigation-without-resolve */
  import Row from '$lib/components/Row.svelte';
  import GithubMark from './github-mark.svg?component';
  import MacAppStore from './mac-app-store.svg?component';
</script>

<svelte:head>
  <title>Free Ruler for macOS</title>
  <style>
    :root,
    body {
      background-color: #4f8683;
    }
  </style>
</svelte:head>

<main>
  <div class="icon" />

  <article>
    <header>
      <h1>Free Ruler</h1>
      <p>A ruler application for macOS</p>
    </header>
    <h3>Features</h3>
    <ul>
      <li>Horizontal and vertical rulers.</li>
      <li>Measure in pixels, millimeters, or inches (press U to cycle).</li>
      <li>Float rulers above other applications (press F to toggle).</li>
      <li>Move windows independently or as a group (press G to toggle).</li>
      <li>Show, hide, and reopen rulers from the menu or keyboard.</li>
      <li>Drag the end of each ruler to resize.</li>
      <li>Show or hide the shadow behind rulers (press S to toggle).</li>
      <li>Align rulers at mouse location (press O for origin).</li>
      <li>Reset ruler locations with Command-R.</li>
      <li>Available in multiple languages.</li>
    </ul>

    <h3>Download</h3>

    <Row>
      <a href="https://apps.apple.com/us/app/free-ruler/id1483172210?mt=12"><MacAppStore /></a>
      <a href="https://github.com/pascalpp/FreeRuler/releases" class="github">
        <GithubMark />
        Download from GitHub
      </a>
    </Row>

    <p>
      Free Ruler requires macOS Sonoma or later. <a
        href="https://github.com/pascalpp/FreeRuler/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"
      >
        Your feedback is welcome!
      </a>
    </p>

    <p>
      Direct downloads from GitHub are signed, notarized, and can check for updates automatically. For older builds, see
      the <a href="https://github.com/pascalpp/FreeRuler/releases">releases page</a>.
    </p>

    <h3>Feedback</h3>
    <p>
      Free Ruler is open source. For bugs or feature requests, see the <a
        href="https://github.com/pascalpp/FreeRuler/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">issues list</a
      >
      or <a href="https://github.com/pascalpp/FreeRuler/issues/new">open a new issue</a>.
    </p>
    <p>
      Or you can <a href="https://www.paypal.me/pascalpp" rel="nofollow">make a donation</a>.
    </p>
    <p>
      Made with love by <a href="/">this guy</a>.
    </p>
  </article>
</main>

<style lang="less">
  main {
    background-color: #4f8683;
    padding: 2vw;
    gap: 2em;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;

    @media @desktop {
      margin-inline: auto;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
  }

  a {
    color: #4f8683;
    text-underline-offset: 2px;
  }

  .icon {
    background-image: url(./freeruler.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 400px;
    height: 400px;
  }

  header {
    font-size: 20px;
    text-align: center;
    h1 {
      font-size: 1.25em;
      margin-bottom: 0.25em;
    }
    p {
      margin: 0;
    }
  }

  article {
    padding: 24px;
    padding-bottom: 40px;
    max-width: 600px;
    background-color: white;
    border-radius: 36px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.75em;
    > * {
      margin: 0;
    }

    h3 {
      margin-top: 1.5em;
    }

    .github {
      color: black;
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 0.5em;
      border-radius: 6px;
      color: black;
      text-decoration: none;
      border: 1px solid rgb(0 0 0 / 50%);
      :global(svg) {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
