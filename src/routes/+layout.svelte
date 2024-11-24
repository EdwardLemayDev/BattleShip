<script lang="ts" module>
	import { initCore } from '$lib/core/Core.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
</script>

<script lang="ts">
	import '../app.css';

	let { children } = $props();

	initCore();
</script>

<DevMenu />

{@render children()}
