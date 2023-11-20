<script lang="ts">
  import { reset } from './pages.store';

  function onClickReset() {
    if (confirm('Are you sure you want to start over?')) {
      reset();
    }
  }
</script>

<p>
  <button type="button" class="unstyled reset-button" on:click={onClickReset}>Reset data…</button>
</p>
