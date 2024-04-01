<svelte:head>
  <title>Free Ruler for macOS</title>
</svelte:head>

<main>
  <div class="icon" />

  <article>
    <header>
      <h1>Free Ruler 2.0</h1>
      <p>A ruler application for macOS</p>
    </header>
    <h3>Features</h3>
    <ul>
      <li>Horizontal and vertical rulers.</li>
      <li>Measure in pixels, inches, or millimeters.</li>
      <li>Float rulers above other applications (press F to toggle).</li>
      <li>Move windows independently or as a group (press G to toggle).</li>
      <li>Show or hide the shadow behind rulers (press S to toggle).</li>
      <li>Align rulers at mouse location (press O for origin).</li>
      <li>Reset ruler locations with Command-R.</li>
    </ul>

    <h3>Download</h3>
    <p>
      See the <a href="https://github.com/pascalpp/FreeRuler/releases">releases page</a>.
    </p>
    <p>
      Should be compatible with macOS Sonoma, Ventura, Catalina, Mojave, and maybe a few older releases. <a
        href="https://github.com/pascalpp/FreeRuler/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"
      >
        Your feedback is welcome!
      </a>
    </p>

    <h3>Todo</h3>
    <p>
      See <a href="https://github.com/pascalpp/FreeRuler/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
        the list of open issues
      </a>. For feature requests,
      <a href="https://github.com/pascalpp/FreeRuler/issues/new">open a new issue</a>.
    </p>
    <h3>Contributing</h3>
    <p>As this is my first Swift application, any help is appreciated!</p>
    <p>
      If you have experience with Mac app development in Swift, please look at the <a
        href="https://github.com/pascalpp/FreeRuler/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+sort%3Aupdated-desc"
      >
        help wanted issues
      </a>.
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
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(black, 0.2);

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
  }
</style>
