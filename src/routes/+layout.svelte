<script lang="ts">
	import { Dev, DevMenu } from '$lib/dev';
	import { Game } from '$lib/logic/Game.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import '../app.css';

	let { children } = $props();

	if (Dev) new Dev();
	new GUI();
	new Game();
</script>

<DevMenu />

{@render children()}
