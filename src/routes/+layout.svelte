<script lang="ts">
	import '../app.less';

	import Layer from '$lib/components/Layer.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import { fade } from 'svelte/transition';
</script>

<Layer>
	<Toaster>
		<slot />
	</Toaster>
</Layer>
