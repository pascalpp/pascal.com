<script lang="ts">
  export let tag: string;
  export let link = true;
</script>

{#if link}
  <a href="/diary/tag/{tag}">
    <span class="tag">{tag}</span>
  </a>
{:else}
  <span class="tag">{tag}</span>
{/if}

<style lang="less">
  .tag {
    font-family: var(--mono-font);
    font-weight: normal;
    display: inline-block;
    padding: 0.25em 0.75em;
    border-radius: 1em;
    background-color: white;
    border: 1px solid steelblue;
  }
</style>
