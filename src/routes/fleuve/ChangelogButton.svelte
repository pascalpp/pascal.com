<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import ChangelogContent from './changelog.md';
	import { metadata } from './changelog.md';
</script>

<Toolbar bottom right>
	<button slot="button" let:toggle on:click={toggle} aria-label="View changelog" title="View changelog">
		Version {metadata.latest}
	</button>
	<div class="changelog-panel" slot="panel">
		<ChangelogContent />
	</div>
</Toolbar>

<style lang="less">
	.changelog-panel {
		min-width: min(400px, 90vw);
		max-width: 95vw;
		padding: 8px;
		padding-bottom: 20px;
	}
	// .changelog {
	// 	position: relative;

	// 	.changelog-panel {
	// 		position: absolute;
	// 		bottom: 100%;
	// 		right: 0px;
	// 		min-width: 400px;
	// 		box-shadow: 0 4p 4px 0 rgba(black, 0.1);
	// 		max-height: 0;
	// 		overflow: hidden;
	// 		margin-bottom: 12px;

	// 		.changelog-content {
	// 			background-color: white;
	// 			border-radius: 8px;
	// 			border: 1px solid fade(black, 20%);
	// 			transition: all 0.2s ease-in-out;
	// 			padding-bottom: 0px;
	// 			overflow-y: scroll;
	// 			height: 100%;
	// 			padding-bottom: 20px;
	// 		}

	// 		opacity: 0;
	// 		&.show {
	// 			max-height: 80vh;
	// 			opacity: 1;
	// 		}
	// 	}
	// }
</style>
