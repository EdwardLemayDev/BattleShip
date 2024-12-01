<script lang="ts" module>
	import { initGUI } from '$lib/game/GUI.svelte';
	import { initDevConfig } from '$lib/logic/DevConfig.svelte';
	import { initGameLogic } from '$lib/logic/Game.svelte';
</script>

<script lang="ts">
	import '../app.css';
	let { children } = $props();

	initGUI(initDevConfig());
	initGameLogic();
</script>

{@render children()}
