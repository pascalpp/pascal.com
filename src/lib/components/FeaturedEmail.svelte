<script lang="ts">
  export let attributes: Record<string, string>;
</script>

<div class="featured-email">
  <div class="featured-email-content">
    <h3>Featured email:</h3>
    <div class="email-text">
      <p>
        {#if attributes.from}
          From: {attributes.from}
          <br />
        {/if}
        {#if attributes.date}
          Date: {attributes.date}
          <br />
        {/if}
        {#if attributes.subject}
          Subject: {attributes.subject}
        {/if}
      </p>

      <slot />
    </div>
  </div>
</div>

<style lang="less">
  @textcolor: #000;
  @bubblecolor: #ffffcc;

  .featured-email {
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 5em;
    max-width: 400px;
    position: relative;
    @media @mobile {
      margin: 1.5em;
    }

    .featured-email-content {
      background-color: @bubblecolor;
      color: @textcolor;
      font-size: 12px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transform: rotate(-3deg);
      z-index: 1;
    }

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.2), 0 5px 50px rgba(0, 0, 0, 0.25);
      transform: translateX(0.1em) translateY(1em) rotate(-2deg) scaleX(98%) scaleY(93%);
      filter: blur(1px);
    }

    h3 {
      box-shadow: inset 0 -60px 60px -60px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 0, 0, 0.15);
      margin: 0;
      padding: 1em 1.5em;
    }
    .email-text {
      font-family: 'Lucida Console', Monaco, monospace;
      padding: 1.5em;
      padding-top: 1em;
    }
  }
</style>
