<script lang="ts" module>
	import { initCore } from '$lib/core/Core.svelte';
</script>

<script lang="ts">
	import '../app.css';

	let { children } = $props();

	initCore();
</script>

{@render children()}
