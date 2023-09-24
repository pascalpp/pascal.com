<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import ChangelogContent from './changelog.md';
  import { metadata } from './changelog.md';
</script>

<Toolbar bottom right taborder={0} id="changelog" label="Changelog">
  <button
    type="button"
    slot="button"
    let:show
    let:toggle
    on:click={toggle}
    aria-label="Version button"
    title="View changelog"
    aria-controls="changelog"
    aria-expanded={show}
  >
    Version {metadata.latest}
  </button>
  <div class="changelog-panel" slot="panel">
    <ChangelogContent />
  </div>
</Toolbar>

<style lang="less">
  button {
    font-size: 13px;
  }

  .changelog-panel {
    min-width: min(400px, 90vw);
    max-width: 95vw;
    padding: 8px;
    padding-bottom: 20px;
  }
</style>
