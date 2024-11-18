<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { Game } from '$lib/logic/Game.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import GameModeSelect from './GameModeSelect.svelte';
	import GameProfiles from './GameProfiles.svelte';
	import LobbyPopUp from './LobbyPopUp.svelte';
	import { PopUpStage } from './PopUpStage.svelte';
</script>

<script lang="ts">
	const game = Game.fromContext();
	const gui = GUI.fromContext();
	const popUp = new PopUpStage();
</script>

<StageElement>
	<div class="grid w-full max-w-xl grid-cols-1 grid-rows-1">
		<div class="col-start-1 row-start-1 flex flex-col items-center gap-4 p-2">
			<h1 class="mb-4 select-none text-center text-5xl font-bold tracking-widest text-neutral-200">
				Game Lobby
			</h1>
			<GameModeSelect />
			<GameProfiles />
			<div
				class="grid w-full select-none grid-cols-4 rounded-md border border-neutral-800 p-2 text-center"
			>
				<MenuButton
					size="sm"
					accent="danger"
					onclick={() => {
						game.resetLobby();
						gui.dispatch('quit');
					}}>Quit</MenuButton
				>
				<MenuButton
					size="sm"
					onclick={() => {
						popUp.dispatch('openPvE');
					}}>PvE</MenuButton
				>
				<MenuButton
					size="sm"
					onclick={() => {
						popUp.dispatch('openPvP');
					}}>PvP</MenuButton
				>
				<MenuButton size="sm" accent="success">Start</MenuButton>
			</div>
		</div>
		<LobbyPopUp />
	</div>
</StageElement>
