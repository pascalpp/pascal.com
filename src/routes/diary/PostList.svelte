<script lang="ts">
  import ButtonBar from '$lib/components/ButtonBar.svelte';
  import type { PostSummary } from '../api/posts/util';
  import PostListItem from './PostListItem.svelte';
  import Tag from './Tag.svelte';

  export let posts: PostSummary[] = [];
  export let tag = '';

  let sortOrder = 'newest';

  const sortOptions = [
    { value: 'oldest', label: 'Oldest' },
    { value: 'newest', label: 'Newest' },
  ];

  function onClickSortOrder(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    sortOrder = target.value;
  }

  $: sorted = posts.slice().sort((a, b) => {
    const reverse = sortOrder === 'newest';
    const multiplier = reverse ? 1 : -1;
    if (b.metadata.date < a.metadata.date) return -1 * multiplier;
    if (b.metadata.date > a.metadata.date) return 1 * multiplier;
    return 0;
  });

  const dateFormatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function formatDate(timestamp: string) {
    try {
      const date = new Date(timestamp);
      return dateFormatter.format(date);
    } catch (e) {
      console.log(timestamp);
      return timestamp;
    }
  }
</script>

<header>
  <span class="title">
    {#if tag}
      <span class="label">Posts tagged with</span>
      <Tag {tag} />
    {:else}
      <span class="label">All Posts</span>
    {/if}
  </span>

  <div class="buttons">
    <ButtonBar options={sortOptions} selected={sortOrder} on:click={onClickSortOrder} />
  </div>
</header>

<ul class="post-list">
  {#each sorted as post}
    {#key post.slug}
      <PostListItem {post} />
    {/key}
  {/each}
</ul>

<style lang="less">
  header {
    font-size: 14px;
    font-weight: normal;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2em;
    margin-inline: auto;

    @media @mobile {
      flex-direction: column;
      gap: 1em;
    }

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
    }

    .label {
      font-size: 24px;
    }

    .buttons {
      font-family: var(--sans-font);
    }
  }

  .post-list {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-inline: 2rem;
    @media @mobile {
      flex-direction: column;
      grid-column: full-width;
    }
  }
</style>
