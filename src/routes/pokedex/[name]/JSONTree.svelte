<script lang="ts">
  /* oxlint-disable svelte/require-each-key, no-undef, no-unassigned-vars */
  export let value: unknown;
  export let defaultExpandedLevel = 0;
  export let level = 0;

  $: isArray = Array.isArray(value);
  $: isObject = !!value && typeof value === 'object';
  $: entries = isObject ? Object.entries(value as Record<string, unknown>) : [];
  $: expanded = level < defaultExpandedLevel;

  function format(value: unknown) {
    if (typeof value === 'string') return JSON.stringify(value);
    if (value === null) return 'null';
    return String(value);
  }
</script>

{#if isObject}
  <details open={expanded}>
    <summary>{isArray ? `Array(${entries.length})` : `Object(${entries.length})`}</summary>
    <ul>
      {#each entries as [key, entry]}
        <li>
          <span class="key">{isArray ? Number(key) : key}</span>
          <svelte:self value={entry} {defaultExpandedLevel} level={level + 1} />
        </li>
      {/each}
    </ul>
  </details>
{:else}
  <span class="value">{format(value)}</span>
{/if}

<style>
  details {
    margin-left: 1rem;
  }

  summary {
    cursor: default;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 1rem;
  }

  li {
    margin: 0.125rem 0;
  }

  .key {
    color: var(--gray-7);
    display: inline-block;
    margin-right: 0.5rem;
  }

  .value {
    color: var(--gray-9);
  }
</style>
