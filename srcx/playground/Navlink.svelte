<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let href: string;
  export let label: string;
  export let path: string | undefined = undefined;
</script>

<Button link {href} {label} active={path?.startsWith(href)} />
