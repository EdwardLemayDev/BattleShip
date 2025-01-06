<script lang="ts" module>
	import ShipSprite from '$lib/layout/Game/ShipSprite.svelte';
	import { setCoreLogic } from '$lib/logic/Core.svelte';
	import { setDevLogic } from '$lib/logic/Dev.svelte';
	import { setGameLogic } from '$lib/logic/Game.svelte';
</script>

<script lang="ts">
	import '../app.css';
	let { children } = $props();

	setCoreLogic(setDevLogic(), setGameLogic());
</script>

<ShipSprite />

{@render children()}
