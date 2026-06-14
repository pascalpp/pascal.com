<script lang="ts">
  import { onDestroy } from 'svelte';

  type Helper = {
    id: string;
    name: string;
    token: string;
    description: string;
    snippet: string;
    classValue?: string;
    demoClass?: string;
    demoStyle?: string;
  };

  const layoutHelpers: Helper[] = [
    {
      id: 'breakout',
      name: '.breakout',
      token: '.breakout',
      classValue: 'breakout',
      description: 'Expands an element into the narrow breakout columns on both sides of the reading column.',
      snippet: `<section class="breakout">

### Breakout heading

Extra emphasis without going edge to edge.

</section>`,
    },
    {
      id: 'breakout-left',
      name: '.breakout-left',
      token: '.breakout-left',
      classValue: 'breakout-left',
      description: 'Pulls the left edge into the left breakout column while keeping the right edge aligned to content.',
      snippet: `<p class="breakout-left">
  A small left-leaning note or callout.
</p>`,
    },
    {
      id: 'breakout-right',
      name: '.breakout-right',
      token: '.breakout-right',
      classValue: 'breakout-right',
      description: 'Keeps the left edge aligned to content and extends the right edge into the breakout column.',
      snippet: `<p class="breakout-right">
  A small right-leaning note or callout.
</p>`,
    },
    {
      id: 'bleed',
      name: '.bleed',
      token: '.bleed',
      classValue: 'bleed',
      description: 'Lets an element occupy the full diary grid from the left edge to the right edge.',
      snippet: `<div class="bleed" style="max-width: 1400px; padding-inline: 2rem;">

![Description](./image.png){: .polaroid loading=lazy width=1200 }

</div>`,
    },
    {
      id: 'bleed-left',
      name: '.bleed-left',
      token: '.bleed-left',
      classValue: 'bleed-left',
      description: 'Extends the left edge to the full-width start while preserving the normal right edge.',
      snippet: `<div class="bleed-left">
  Content that should lean hard to the left.
</div>`,
    },
    {
      id: 'bleed-right',
      name: '.bleed-right',
      token: '.bleed-right',
      classValue: 'bleed-right',
      description: 'Extends the right edge to the full-width end while preserving the normal left edge.',
      snippet: `<div class="bleed-right">

<MyWideDemo />

</div>`,
    },
    {
      id: 'full-width',
      name: '.full-width',
      token: '.full-width',
      classValue: 'full-width',
      description:
        'Creates a full grid band that still provides the normal content, breakout, and bleed columns inside it.',
      snippet: `<div class="full-width">

Content inside this band can still use diary grid helpers.

<aside style="grid-column: content-end / full-width-end">
  A side note can sit in the right rail of a .full-width element.
</aside>

</div>`,
    },
  ];

  const imageHelpers: Helper[] = [
    {
      id: 'polaroid',
      name: '.polaroid',
      token: '.polaroid',
      demoClass: 'polaroid',
      description: 'Adds the white photo border, small rotation, and shadow used throughout older photo posts.',
      snippet: `![Description](./image.png){: .polaroid loading=lazy width=800 }`,
    },
    {
      id: 'centered',
      name: '.centered',
      token: '.centered',
      demoClass: 'centered',
      description: 'Centers the item by turning its parent into a small flex column.',
      snippet: `![Description](./image.png){: .centered loading=lazy width=600 }`,
    },
    {
      id: 'bordered',
      name: '.bordered',
      token: '.bordered',
      demoClass: 'bordered',
      description: 'Adds a subtle border to screenshots and UI images.',
      snippet: `![Description](./screenshot.png){: .bordered loading=lazy }`,
    },
    {
      id: 'padded',
      name: '.padded',
      token: '.padded',
      demoClass: 'padded bordered',
      description: 'Adds white padding behind transparent or edge-to-edge images.',
      snippet: `![Description](./image.png){: .padded loading=lazy }`,
    },
    {
      id: 'polaroid-centered',
      name: '.polaroid .centered',
      token: '.polaroid .centered',
      demoClass: 'polaroid centered',
      description: 'A common combination for a centered, framed image.',
      snippet: `![Description](./image.png){: .polaroid .centered loading=lazy width=800 }`,
    },
    {
      id: 'custom-style',
      name: 'custom style',
      token: 'style=""',
      demoClass: 'polaroid',
      demoStyle: '--polaroid-deg: 5deg; --shadow-offset: 0.75em;',
      description: 'Sets one-off CSS variables or inline styles in the Markdown image attributes.',
      snippet: `![Description](./image.png){: .polaroid style="--polaroid-deg: 5deg; --shadow-offset: 0.75em;" loading=lazy width=800 }`,
    },
  ];

  const asideHelper: Helper = {
    id: 'aside',
    name: '<aside>',
    token: '<aside>',
    description: 'Creates a side note on wide screens and a bordered inset note on smaller screens.',
    snippet: `<aside style="--aside-span: 3">

### aside content

</aside>`,
  };

  const allHelpers = [...layoutHelpers, ...imageHelpers];

  const sampleImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#d9ecff"/>
      <stop offset="1" stop-color="#ffe6c7"/>
    </linearGradient>
  </defs>
  <rect width="900" height="560" fill="url(#sky)"/>
  <circle cx="705" cy="145" r="72" fill="#f0b84f"/>
  <path d="M0 360 C170 285 300 395 455 330 C610 265 735 330 900 250 L900 560 L0 560 Z" fill="#6aa47a"/>
  <path d="M0 430 C180 385 315 475 485 410 C665 340 770 420 900 350 L900 560 L0 560 Z" fill="#2f6f68"/>
  <rect x="105" y="104" width="290" height="170" rx="16" fill="#ffffff" opacity="0.72"/>
  <rect x="135" y="135" width="230" height="20" rx="10" fill="#3f6f91"/>
  <rect x="135" y="176" width="175" height="20" rx="10" fill="#bf6257"/>
  <rect x="135" y="217" width="205" height="20" rx="10" fill="#d69b45"/>
</svg>`;

  const sampleImage = `data:image/svg+xml,${encodeURIComponent(sampleImageSvg)}`;

  let copiedKey = '';
  let quickCopyValue = '';
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  async function copyText(key: string, text: string) {
    if (resetTimer) clearTimeout(resetTimer);

    try {
      await navigator.clipboard.writeText(text);
      copiedKey = key;
    } catch {
      copiedKey = '';
    }

    resetTimer = setTimeout(() => {
      copiedKey = '';
    }, 1800);
  }

  async function copyTokenFromSelect(event: Event) {
    const select = event.currentTarget as HTMLSelectElement;
    const helper = allHelpers.find(({ id }) => id === select.value);

    if (!helper) return;

    await copyText(`${helper.id}-token`, helper.token);
    quickCopyValue = '';
  }
</script>

<svelte:head>
  <title>Pascal's Diary - Styleguide</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<article class="styleguide full-width">
  <header class="guide-header">
    <div class="guide-title-row">
      <h1>Diary Style Guide</h1>

      <select
        class="quick-copy-select"
        aria-label="Quick copy helper token"
        bind:value={quickCopyValue}
        on:change={copyTokenFromSelect}
      >
        <option value="">Quick copy</option>
        {#each allHelpers as helper}
          <option value={helper.id}>{helper.name}</option>
        {/each}
      </select>
    </div>
    <p>
      A pocket reference for the classes and tiny HTML patterns that make diary posts wider, framed, centered, or tucked
      into the margins.
    </p>
  </header>

  <section class="guide-section layout-section full-width" aria-labelledby="layout-heading">
    <div class="layout-map full-width" aria-label="Layout helper width examples">
      <h4>Normal content column</h4>

      <aside style="--aside-span: 3">
        <div class="helper-card-header">
          <h3 id="aside-title"><code>aside</code></h3>
          <div class="copy-row">
            <button
              type="button"
              class:copied={copiedKey === `${asideHelper.id}-snippet`}
              on:click={() => copyText(`${asideHelper.id}-snippet`, asideHelper.snippet)}
            >
              {copiedKey === `${asideHelper.id}-snippet` ? 'Copied' : 'Copy snippet'}
            </button>
          </div>
        </div>
        <p>{asideHelper.description}</p>
        <pre class="snippet"><code>{asideHelper.snippet}</code></pre>
      </aside>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>

      <p>
        Place the aside after the first element you want it to sit beside. By default it will space 3 rows of content.
        Override by setting the <code>--aside-span</code> CSS variable.
      </p>

      {#each layoutHelpers as helper}
        <div class={`demo-band ${helper.classValue ?? ''}`} role="group" aria-labelledby={`${helper.id}-title`}>
          <div class="layout-helper-header">
            <div>
              <h3 id={`${helper.id}-title`}><code>{helper.name}</code></h3>
              <p>{helper.description}</p>
            </div>

            <button
              type="button"
              class:copied={copiedKey === `${helper.id}-snippet`}
              on:click={() => copyText(`${helper.id}-snippet`, helper.snippet)}
            >
              {copiedKey === `${helper.id}-snippet` ? 'Copied' : 'Copy snippet'}
            </button>
          </div>

          {#if helper.id === 'full-width'}
            <aside class="full-width-demo-aside">
              Children of a .full-width element can participate in the diary grid layout as well.
            </aside>
          {/if}

          <pre class="snippet layout-snippet"><code>{helper.snippet}</code></pre>
        </div>
      {/each}
    </div>
  </section>

  <section class="guide-section image-section full-width" aria-labelledby="image-heading">
    <div class="section-header">
      <h2 id="image-heading">Image helpers</h2>
      <p>These are written in Markdown image attributes and can be stacked together.</p>
    </div>

    <div class="image-helper-list bleed-right">
      {#each imageHelpers as helper}
        <section class="image-helper-row" aria-labelledby={`${helper.id}-title`}>
          <figure class="image-demo">
            <img
              class={`sample-image ${helper.demoClass ?? ''}`}
              src={sampleImage}
              width="360"
              height="224"
              alt="Sample landscape"
              style={helper.demoStyle}
            />
            <figcaption><code>{helper.name}</code></figcaption>
          </figure>

          <div class="image-helper-snippet">
            <div class="helper-card-header">
              <h3 id={`${helper.id}-title`}><code>{helper.name}</code></h3>
              <div class="copy-row">
                <button
                  type="button"
                  class:copied={copiedKey === `${helper.id}-snippet`}
                  on:click={() => copyText(`${helper.id}-snippet`, helper.snippet)}
                >
                  {copiedKey === `${helper.id}-snippet` ? 'Copied' : 'Copy snippet'}
                </button>
              </div>
            </div>
            <p>{helper.description}</p>
            <pre class="snippet"><code>{helper.snippet}</code></pre>
          </div>
        </section>
      {/each}
    </div>
  </section>
</article>

<style lang="less">
  .styleguide {
    row-gap: 1.5rem;
  }

  .guide-header,
  .section-header {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-top: 1rem;
  }

  .guide-header {
    position: relative;

    h1 {
      font-size: 3rem;
    }
  }

  .guide-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .section-header p,
  .helper-card p,
  .image-helper-snippet p,
  .image-demo figcaption {
    color: rgb(0 0 0 / 0.65);
  }

  .guide-section {
    row-gap: 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.6rem;
    }
  }

  .quick-copy-select {
    border-radius: 4px;
    color: black;
    font: menu;
    font-size: 1rem;
  }

  button.copied {
    background-color: color-mix(in srgb, #d7f4df 82%, white);
    border-color: color-mix(in srgb, #278b46 65%, black);
  }

  .layout-map,
  .structure-demo {
    --margin-inline: 0.75rem;
    --content-max-width: 44ch;
    --breakout-width: clamp(1rem, 7vw, 5rem);

    grid-column: full-width;
    padding-block: 1rem;
  }

  .content-sample,
  .demo-band {
    border: 1px solid rgb(0 0 0 / 0.12);
    border-radius: 6px;
    padding-inline: 1rem;
  }

  .content-sample {
    line-height: 3rem;
    background-color: rgb(255 255 255 / 0.8);
    color: rgb(0 0 0 / 0.65);
  }

  .demo-band {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    padding-block: 0.9rem;
    line-height: 1.35;
    background-color: rgb(213 231 246 / 0.82);
    color: rgb(21 54 75);

    > :not(.full-width-demo-aside) {
      grid-column: content;
    }

    &.breakout-left,
    &.breakout-right {
      background-color: rgb(223 236 211 / 0.88);
      color: rgb(45 74 40);
    }

    &.full-width {
      display: grid;
      grid-template-columns: subgrid;
      background-color: rgb(250 238 191 / 0.92);
      color: rgb(87 64 24);
    }

    &.bleed,
    &.bleed-left,
    &.bleed-right {
      background-color: rgb(239 217 217 / 0.92);
      color: rgb(90 42 42);
    }

    p {
      margin-top: 0.35rem;
      line-height: 1.35;
      opacity: 0.78;
    }
  }

  .full-width-demo-aside {
    grid-column: content-end / full-width-end;
    grid-row: span 2;
    align-self: start;
    margin: 0 1rem;
    padding: 0 1rem;
    max-width: 28ch;
    border-left: 1px solid rgb(87 64 24 / 0.28);
    color: rgb(87 64 24 / 0.78);
  }

  .layout-helper-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    min-width: 0;

    > div {
      min-width: 0;
    }

    button {
      flex: 0 0 auto;
    }
  }

  .layout-snippet {
    background-color: rgb(255 255 255 / 0.72);
    border: 1px solid rgb(0 0 0 / 0.1);
    color: rgb(0 0 0 / 0.82);
  }

  .helper-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: 0.75rem;
    padding-right: 1rem;
  }

  .helper-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.9rem;
    background-color: rgb(255 255 255 / 0.74);
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 6px;
  }

  .helper-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .copy-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.4rem;
  }

  .snippet {
    overflow: auto;
    margin: 0;
    padding: 0.75rem;
    border-radius: 4px;
    background-color: rgb(30 36 41);
    color: rgb(246 247 248);
    font-family: var(--mono-font);
    line-height: 1.45;
    white-space: pre-wrap;
  }

  .image-helper-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-right: 1rem;
  }

  .image-helper-row {
    display: grid;
    grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
    min-width: 0;
  }

  .image-demo {
    min-width: 0;
    margin: 0;
    gap: 0.35rem;
    justify-content: center;
  }

  .image-helper-snippet {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.9rem;
    background-color: rgb(255 255 255 / 0.82);
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 6px;
  }

  .sample-image {
    width: min(100%, 18rem);
    height: auto;
  }

  .structure-demo {
    row-gap: 0.75rem;
  }

  @media @mobile {
    .styleguide {
      padding-top: 0;
    }

    .helper-card-header {
      flex-direction: column;
    }

    .quick-copy-select {
      max-width: 100%;
    }

    .image-helper-row {
      grid-template-columns: 1fr;
      align-items: start;
    }

    .full-width-demo-aside {
      grid-column: content;
      grid-row: auto;
      margin-inline: 0;
    }

    .copy-row {
      justify-content: flex-start;
    }
  }
</style>
