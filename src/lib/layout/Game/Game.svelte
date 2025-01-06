<script lang="ts" module>
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import Board from './Board.svelte';
	import Lobby from './Lobby/Lobby.svelte';
</script>

<script lang="ts">
	const game = useGameLogic();
</script>

{#if game.state === 'lobby'}
	<Lobby />
{:else}
	<Board />
{/if}
