<script lang="ts">
  import EditPostButton from './EditPostButton.svelte';
  import TagEditor from './TagEditor.svelte';
  import StatusButton from './StatusButton.svelte';
  import type { PostSummary } from '../../api/posts/util';

  export let post: PostSummary;
</script>

<div class="row">
  <EditPostButton {post} />
  <TagEditor {post} />
  <StatusButton {post} />
</div>

<style lang="less">
  .row {
    margin-top: 0.75em;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  :global(button) {
    font-family: var(--sans-font);
    font-weight: normal;
    font-size: 12px;
    vertical-align: middle;
  }
</style>
