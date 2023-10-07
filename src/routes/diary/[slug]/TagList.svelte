<script lang="ts">
  import Tag from '../Tag.svelte';

  export let tags: string[] = [];
</script>

{#if tags?.length}
  <p class="tags">
    {#if tags?.length}
      {#each tags as tag}
        <Tag {tag} />
      {/each}
    {/if}
  </p>
{/if}

<style lang="less">
  .tags {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
</style>
