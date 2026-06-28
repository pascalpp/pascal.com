<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  const names = data.names;

  const randomName = names[Math.floor(Math.random() * names.length)];

  onMount(() => {
    goto(`/pokedex/${randomName}`);
  });
</script>
