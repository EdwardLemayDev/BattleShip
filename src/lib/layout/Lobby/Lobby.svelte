<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { useCore } from '$lib/core/Core.svelte';
	import LobbyPopUp from './LobbyPopUp.svelte';
</script>

<script lang="ts">
	const { lobby } = useCore();
</script>

<StageElement>
	<div class="grid w-full max-w-xl grid-cols-1 grid-rows-1">
		<div class="col-start-1 row-start-1 flex flex-col items-center gap-4 p-2">
			<h1 class="mb-4 select-none text-center text-5xl font-bold tracking-widest text-neutral-200">
				Game Lobby
			</h1>
			<!-- <GameModeSelect /> -->
			<!-- <GameProfiles /> -->
			<div
				class="grid w-full select-none grid-cols-4 rounded-md border border-neutral-800 p-2 text-center"
			>
				<MenuButton
					size="sm"
					accent="danger"
					onclick={() => {
						lobby.quit();
					}}>Quit</MenuButton
				>
				<MenuButton
					size="sm"
					onclick={() => {
						lobby.popUp('pve');
					}}>PvE</MenuButton
				>
				<MenuButton
					size="sm"
					onclick={() => {
						lobby.popUp('pvp');
					}}>PvP</MenuButton
				>
				<MenuButton
					size="sm"
					accent="success"
					onclick={() => {
						// events.start();
					}}>Start</MenuButton
				>
			</div>
		</div>
		<LobbyPopUp />
	</div>
</StageElement>
