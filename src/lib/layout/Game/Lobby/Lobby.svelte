<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import { blur } from 'svelte/transition';
	import GameModeSelect from './GameModeSelect.svelte';
	import PlayerSelect from './PlayerSelect.svelte';
</script>

<script lang="ts">
	const core = useCoreLogic();
	const game = useGameLogic();
</script>

<div
	class="col-start-1 row-start-1 flex w-full max-w-xl flex-col items-center gap-4 rounded-xl"
	transition:blur={{ duration: GLOBAL_ANIMATION_DURATION }}
>
	<h1 class="mb-4 select-none text-center text-5xl font-bold tracking-widest text-neutral-200">
		Game Lobby
	</h1>
	<GameModeSelect />
	<PlayerSelect />
	<div class="grid w-full grid-flow-col rounded-md border border-neutral-800 p-2">
		<MenuButton size="sm" accent="danger" onclick={core.quitGame}>Back</MenuButton>
		<MenuButton size="sm" accent="success" onclick={() => game.send('start')}>Start</MenuButton>
	</div>
</div>
