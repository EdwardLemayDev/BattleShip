<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import { GameLogic } from '$lib/logic/Game.svelte';
	import GameModeSelect from './GameModeSelect.svelte';
	import GameProfiles from './GameProfiles.svelte';
</script>

<script lang="ts">
	const game = GameLogic.fromContext();
</script>

<StageElement>
	<div class="flex flex-col gap-4 rounded-xl border-2 border-neutral-900 p-6">
		<h1 class="mb-8 select-none text-center text-5xl font-bold tracking-widest text-neutral-400">
			Game Lobby
		</h1>
		<GameModeSelect />
		<GameProfiles />
		<div class="select-none text-center">-- MAIN MENU --</div>
	</div>
</StageElement>
