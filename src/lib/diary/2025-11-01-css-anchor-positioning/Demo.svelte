<script lang="ts">
  import { onMount } from 'svelte';

  let supportsAnchorPositioning = false;

  $: console.log('supportsAnchorPositioning:', supportsAnchorPositioning);

  onMount(() => {
    // Check if browser supports CSS anchor positioning
    supportsAnchorPositioning = CSS.supports('anchor-name', '--test');

    // Load polyfill if not supported
    if (!supportsAnchorPositioning) {
      const script = document.createElement('script');
      // Use the browser-ready version from CDN
      script.src = 'https://unpkg.com/@oddbird/css-anchor-positioning/dist/css-anchor-positioning.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  });
</script>

<div class="demo">
  <h2>CSS Anchor Positioning Demo</h2>

  {#if supportsAnchorPositioning === false}
    <div class="browser-notice">
      ⚠️ Your browser doesn't natively support CSS Anchor Positioning. Loading polyfill...
    </div>
  {/if}

  <p>
    This demo shows a basic example of CSS anchor positioning. Hover over the anchor button to see the tooltip
    positioned relative to it.
  </p>

  <div class="container">
    <button class="anchor" tabindex="0">⚓︎ Anchor Button</button>

    <div class="tooltip">This tooltip is positioned relative to the anchor using CSS anchor positioning!</div>
  </div>

  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, nulla. Eaque totam deserunt ducimus iure molestias
    officia in temporibus dolorem deleniti distinctio hic, quia non earum magnam ipsa laudantium itaque!
  </p>
</div>

<style lang="less">
  .demo {
    padding: 2rem;
    min-height: 400px;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .browser-notice {
    padding: 1rem;
    margin-bottom: 1rem;
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 6px;
    color: #856404;
    font-size: 0.9rem;
  }

  p {
    margin-bottom: 2rem;
    color: #666;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  .anchor {
    anchor-name: --my-anchor;
    padding: 1rem 2rem;
    font-size: 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      background: #0056b3;
    }
  }

  .tooltip {
    position: absolute;
    position-anchor: --my-anchor;

    /* Position the tooltip below the anchor */
    top: anchor(bottom);
    left: anchor(center);

    /* Center the tooltip horizontally on the anchor */
    translate: -50% 0;

    /* Add some spacing */
    margin-top: 10px;

    /* Styling */
    background: #333;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    max-width: 250px;
    font-size: 0.9rem;
    line-height: 1.4;

    /* Hide by default, show on anchor hover */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;

    /* Add a small arrow pointing up to the anchor */
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #333;
    }
  }

  .anchor:hover ~ .tooltip,
  .anchor:focus ~ .tooltip {
    opacity: 1;
  }
</style>
