<div class="demo">
  <button class="anchor" tabindex="0">Anchor Button</button>

  <div class="tooltip">This tooltip is positioned relative to the anchor using CSS anchor positioning.</div>
</div>

<style lang="less">
  .demo {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .anchor {
    anchor-name: --my-anchor;
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
