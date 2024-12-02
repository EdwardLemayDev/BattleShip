<script lang="ts" module>
	import Switch from '$lib/components/Switch.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import Lobby from './Lobby/Lobby.svelte';
</script>

<script lang="ts">
	const game = useGameLogic();
</script>

<Switch value={game.state}>
	{#snippet idle()}
		<p>idle</p>
	{/snippet}

	{#snippet lobby()}
		<Lobby />
	{/snippet}
</Switch>
