<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import GameModeSelect from './GameModeSelect.svelte';
	import GameProfiles from './GameProfiles.svelte';
</script>

<script lang="ts"></script>

<StageElement>
	<div class="flex w-full max-w-xl flex-col items-center gap-4 rounded-xl">
		<h1 class="mb-4 select-none text-center text-5xl font-bold tracking-widest text-neutral-200">
			Game Lobby
		</h1>
		<GameModeSelect />
		<GameProfiles />
		<div class="w-full select-none rounded-md border border-neutral-800 p-2 text-center">
			<p>MAIN MENU</p>
			<p>Quit | Bot Difficulty | Invite / Kick | Start</p>
		</div>
	</div>
</StageElement>
