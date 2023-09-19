<script lang="ts">
	import { reset } from './pages.store';

	function onClickReset() {
		if (confirm('Are you sure you want to start over?')) {
			reset();
		}
	}
</script>

<button class="reset-button" on:click={onClickReset}>Reset data…</button>

<style lang="less"></style>
