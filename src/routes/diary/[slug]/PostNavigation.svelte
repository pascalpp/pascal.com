<script lang="ts">
  import type { PostSummary } from '../../api/posts/util';

  export let next: PostSummary;
  export let prev: PostSummary;
  export let top = false;
  export let bottom = false;
</script>

<!-- svelte-ignore a11y-accesskey -->
<nav class="post-navigation" class:top class:bottom>
  {#if prev}
    <div class="prev">
      <a accesskey="[" href="/diary/{prev.slug}">← {prev.metadata.title}</a>
    </div>
  {/if}
  {#if next}
    <div class="next">
      <a accesskey="]" href="/diary/{next.slug}">{next.metadata.title} →</a>
    </div>
  {/if}
</nav>

<style lang="less">
  .post-navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.top {
      margin-bottom: 0.5rem;
      min-height: 80px;

      .next {
        justify-self: flex-end;
        align-self: flex-end;
      }
    }

    &.bottom {
      gap: 1em;
      margin-top: 4em;
    }

    --shadow-offset: 2px;

    .prev {
      --deg: 1deg;
      .rotated-shadow;
    }

    .next {
      --deg: -1deg;
      .rotated-shadow;
      align-self: flex-end;
    }

    @media @not-mobile {
      .prev {
        margin-left: -1em;
        max-width: 75%;
      }
      .next {
        margin-right: -1em;
        max-width: 75%;
      }
    }
    @media @mobile {
      gap: 2em;

      &.top {
        display: none;
      }

      .prev {
        margin-right: 1em;
      }
      .next {
        margin-left: 1em;
      }
    }

    a {
      display: block;
      background-color: rgb(255 255 255);
      text-decoration: none;
      padding: 0.5em 0.75em;
    }
  }
</style>
