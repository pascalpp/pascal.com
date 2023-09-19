<script lang="ts">
	import ChangelogContent from './changelog.md';
	import { metadata } from './changelog.md';

	let show = false;
	let button: HTMLButtonElement;

	function toggleChangelog() {
		show = !show;
		if (show) {
			document.body.addEventListener('click', toggleChangelog);
		} else {
			document.body.removeEventListener('click', toggleChangelog);
		}
	}

	function onClickButton(event: MouseEvent) {
		event.stopPropagation();
		button?.focus();
		toggleChangelog();
	}

	function onClickPanel(event: MouseEvent) {
		event.stopPropagation();
		button?.focus();
	}
</script>

<div class="changelog">
	<button class="version" on:click={onClickButton} bind:this={button}>Version {metadata.latest}</button>
	<div class="changelog-panel" class:show on:click={onClickPanel}>
		<ChangelogContent />
	</div>
</div>

<style lang="less">
	.changelog {
		position: relative;

		.changelog-panel {
			position: absolute;
			bottom: 100%;
			right: 0px;
			min-width: 400px;
			background-color: white;
			border-radius: 8px;
			border: 1px solid fade(black, 20%);
			transition: all 0.2s ease-in-out;
			box-shadow: 0 4p 4px 0 rgba(black, 0.1);
			max-height: 0;
			overflow: hidden;
			overflow-y: scroll;
			height: fit-content;
			padding-bottom: 20px;
			margin-bottom: 12px;

			opacity: 0;
			&.show {
				max-height: 80vh;
				opacity: 1;
			}
		}
	}
</style>
