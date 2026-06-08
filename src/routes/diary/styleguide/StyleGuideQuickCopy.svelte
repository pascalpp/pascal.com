<script lang="ts">
  import { allSnippets } from './styleGuideSnippets';

  let quickCopyValue = '';

  async function copyTokenFromSelect(event: Event) {
    const select = event.currentTarget as HTMLSelectElement;
    const helper = allSnippets.find(({ id }) => id === select.value);

    try {
      if (!helper) return;
      await navigator.clipboard.writeText(helper.token);
    } catch {
      // Best-effort quick copy; leave the select ready for another attempt.
    } finally {
      quickCopyValue = '';
    }
  }
</script>

<select
  class="quick-copy-select"
  aria-label="Quick copy helper token"
  bind:value={quickCopyValue}
  on:change={copyTokenFromSelect}
>
  <option value="">Quick copy</option>
  {#each allSnippets as helper}
    <option value={helper.id}>{helper.name}</option>
  {/each}
</select>

<style lang="less">
  .quick-copy-select {
    border-radius: 4px;
    color: black;
    font: menu;
    font-size: 1rem;
  }
</style>
