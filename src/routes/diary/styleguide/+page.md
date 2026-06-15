<script lang="ts">
  import StyleGuideImageExample from './StyleGuideImageExample.svelte';
  import StyleGuideQuickCopy from './StyleGuideQuickCopy.svelte';
  import StyleGuideSnippet from './StyleGuideSnippet.svelte';
</script>

<svelte:head>

  <title>Pascal's Diary - Style Guide</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<article class="styleguide full-width">
  <header class="styleguide-header">
    <div class="styleguide-title-row">
      <h1>Diary Style Guide</h1>
      <StyleGuideQuickCopy />
    </div>

    <p>
      A pocket reference for the classes and tiny HTML patterns that make diary posts wider, framed, centered, or tucked
      into the margins.
    </p>

  </header>

### Normal Content Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<aside style="--aside-span: 3">
  <StyleGuideSnippet id="aside" />
</aside>

Place the aside after the first element you want it to sit beside. By default it will span 3 rows of content. Override that by setting the `--aside-span` CSS variable.

<div class="styleguide-demo-band breakout">
  <StyleGuideSnippet id="breakout" />
</div>

<div class="styleguide-demo-band breakout-left">
  <StyleGuideSnippet id="breakout-left" />
</div>

<div class="styleguide-demo-band breakout-right">
  <StyleGuideSnippet id="breakout-right" />
</div>

<div class="styleguide-demo-band bleed">
  <StyleGuideSnippet id="bleed" />
</div>

<div class="styleguide-demo-band bleed-left">
  <StyleGuideSnippet id="bleed-left" />
</div>

<div class="styleguide-demo-band bleed-right">
  <StyleGuideSnippet id="bleed-right" />
</div>

<div class="styleguide-demo-band full-width">
  <StyleGuideSnippet id="full-width" />

  <aside class="full-width-demo-aside">
    Children of a `.full-width` element can participate in the diary grid layout as well.
  </aside>
</div>

## Image Helpers

These are written in Markdown image attributes and can be stacked together.

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample classes="polaroid" label=".polaroid" />
  <StyleGuideSnippet id="polaroid" />
</div>

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample classes="centered" label=".centered" />
  <StyleGuideSnippet id="centered" />
</div>

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample classes="bordered" label=".bordered" />
  <StyleGuideSnippet id="bordered" />
</div>

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample classes="padded bordered" label=".padded" />
  <StyleGuideSnippet id="padded" />
</div>

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample classes="polaroid centered" label=".polaroid .centered" />
  <StyleGuideSnippet id="polaroid-centered" />
</div>

<div class="image-helper-row bleed-right">
  <StyleGuideImageExample
    classes="polaroid"
    label="custom style"
    styleText="--polaroid-deg: 5deg; --shadow-offset: 0.75em;"
  />
  <StyleGuideSnippet id="custom-style" />
</div>
</article>

<style lang="less">
  .styleguide {
    row-gap: 1.5rem;
  }

  .styleguide-header {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-top: 1rem;
  }

  .styleguide-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }

  .styleguide-title-row h1 {
    font-size: 3rem;
  }

  .styleguide-demo-band {
    padding: 0.9rem 1rem;
    border: 1px solid rgb(0 0 0 / 0.12);
    border-radius: 6px;
    background-color: rgb(213 231 246 / 0.82);
  }

  .styleguide-demo-band.breakout-left,
  .styleguide-demo-band.breakout-right {
    background-color: rgb(223 236 211 / 0.88);
  }

  .styleguide-demo-band.bleed,
  .styleguide-demo-band.bleed-left,
  .styleguide-demo-band.bleed-right {
    background-color: rgb(239 217 217 / 0.92);
    color: rgb(90 42 42);
  }

  .styleguide-demo-band.full-width {
    padding-block: 1rem;
    background-color: rgb(250 238 191 / 0.92);
  }

  .full-width-demo-aside {
    grid-column: content-end / full-width-end;
    grid-row: span 2;
    align-self: start;
    margin: 0 1rem;
    padding: 0 1rem;
    max-width: 28ch;
    border-left: 1px solid rgb(87 64 24 / 0.28);
  }

  .image-helper-row {
    display: grid;
    grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
    min-width: 0;
    padding-right: 1rem;
  }

  @media @mobile {
    .styleguide-title-row :global(.quick-copy-select) {
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
  }
</style>
