<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { Game } from '$lib/logic/Game.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import { fade, scale } from 'svelte/transition';
	import GameModeSelect from './GameModeSelect.svelte';
	import GameProfiles from './GameProfiles.svelte';
	import { PopUpStage } from './PopUpStage.svelte';
</script>

<script lang="ts">
	const game = Game.fromContext();
	const gui = GUI.fromContext();
	const popUp = new PopUpStage();

	const CurrentPopUp = $derived.by(() => {
		switch (popUp.stage) {
			case 'closed':
				return undefined;
			case 'PvE':
				return PvEPopUp;
			case 'PvP':
				return PvPPopUp;
		}
	});
</script>

{#snippet PvEPopUp()}
	<h2 class="p-1 text-3xl font-bold tracking-wider">PvE</h2>
	<div class="grid w-full grid-cols-4 items-center p-1">
		<p class="right w-full text-center text-xl font-semibold">Difficulty :</p>
		<MenuButton
			size="sm"
			accent="success"
			onclick={() => {
				game.ennemyMode = 'PVE1';
				popUp.dispatch('close');
			}}>Easy</MenuButton
		>
		<MenuButton
			size="sm"
			accent="warning"
			onclick={() => {
				game.ennemyMode = 'PVE2';
				popUp.dispatch('close');
			}}>Medium</MenuButton
		>
		<MenuButton
			size="sm"
			accent="danger"
			onclick={() => {
				game.ennemyMode = 'PVE3';
				popUp.dispatch('close');
			}}>Hard</MenuButton
		>
	</div>
	<div class="grid w-full grid-cols-1">
		<MenuButton
			onclick={() => {
				popUp.dispatch('close');
			}}>Back</MenuButton
		>
	</div>
{/snippet}

{#snippet PvPPopUp()}
	<h2 class="p-1 text-3xl font-bold tracking-wider">PvP</h2>
	<p>WIP</p>
	<div class="grid w-full grid-cols-1">
		<MenuButton
			onclick={() => {
				popUp.dispatch('close');
			}}>Back</MenuButton
		>
	</div>
{/snippet}

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
		{#if popUp.stage !== 'closed'}
			<div
				class="z-10 col-start-1 row-start-1 grid place-items-center bg-neutral-950/50 p-4 backdrop-blur"
				transition:fade={{ duration: GLOBAL_ANIMATION_DURATION }}
			>
				<div
					class="flex w-full select-none flex-col items-center gap-4 rounded-lg border border-neutral-900 bg-neutral-950 p-2"
					transition:scale|global={{ duration: GLOBAL_ANIMATION_DURATION }}
				>
					{@render CurrentPopUp?.()}
				</div>
			</div>
		{/if}
	</div>
</StageElement>
