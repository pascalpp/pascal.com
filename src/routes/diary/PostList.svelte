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

  $: grouped = groupBy(sorted, (post) => {
    const date = new Date(post.metadata.date);
    return date.getFullYear().toString();
  });

  type Group<T> = {
    key: string;
    items: T[];
  };

  function groupBy<T>(items: T[], callback: (item: T) => string): Group<T>[] {
    return items.reduce((groups, item) => {
      const key = callback(item);
      const group = groups.find((group) => group.key === key);
      if (group) {
        group.items.push(item);
      } else {
        groups.push({ key, items: [item] });
      }
      return groups;
    }, [] as Group<T>[]);
  }
</script>

<header>
  <span class="title">
    {#if tag}
      <span class="label">Posts tagged with</span>
      <Tag {tag} link={false} />
    {:else}
      <span class="label">All Posts</span>
    {/if}
  </span>

  <div class="buttons">
    <ButtonBar options={sortOptions} selected={sortOrder} on:click={onClickSortOrder} />
  </div>
</header>

<ul class="post-list">
  {#each grouped as group}
    {#key group.key}
      <li class="date-divider">
        <span class="date-text">{group.key}</span>
      </li>
      {#each group.items as post}
        <PostListItem {post} />
      {/each}
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
    font-size: 18px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-inline: 2rem;
    @media @mobile {
      padding-inline: 0;
      flex-direction: column;
      grid-column: full-width;
    }
  }

  .date-divider {
    align-self: center;
    color: rgba(0 0 0 / 0.4);
    width: 20ch;
    overflow: hidden;
    text-align: center;
    margin-top: 1em;
    flex-shrink: 0;

    .date-text {
      display: inline-block;
      position: relative;
      &:before,
      &:after {
        content: '';
        position: absolute;
        height: 0px;
        border-bottom: 1px solid fade(black, 10%);
        top: 50%;
        width: 220px;
      }
      &:before {
        right: 100%;
        margin-right: 8px;
      }
      &:after {
        left: 100%;
        margin-left: 8px;
      }
    }
  }
</style>
