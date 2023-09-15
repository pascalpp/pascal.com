<script lang="ts">
	import PageCard from './PageCard.svelte';
	import type { Page } from './types';

	const page: Page = {
		id: '1',
		title: 'Page 1',
		active: true,
		connections: [
			{ id: '2', title: 'Page 2' },
			{
				id: '3',
				title: 'Page 3',
				connections: [
					{ id: '5', title: 'Page 5' },
					{
						id: '6',
						title: 'Page 6',
						connections: [
							{ id: '7', title: 'Page 7' },
							{ id: '8', title: 'Page 8' },
							{ id: '9', title: 'Page 9' },
						],
					},
				],
			},
			{ id: '4', title: 'Page 4' },
		],
	};
</script>

<main>
	<PageCard {page} />
</main>

<style lang="less">
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
