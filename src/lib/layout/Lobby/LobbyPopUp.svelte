<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { Game } from '$lib/logic/Game.svelte';
	import { fade, scale } from 'svelte/transition';
	import { PopUpStage } from './PopUpStage.svelte';
</script>

<script lang="ts">
	const game = Game.fromContext();
	const popUp = PopUpStage.fromContext();

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
				game.ennemy.setMode('easy');
				popUp.dispatch('close');
			}}>Easy</MenuButton
		>
		<MenuButton
			size="sm"
			accent="warning"
			onclick={() => {
				game.ennemy.setMode('medium');
				popUp.dispatch('close');
			}}>Medium</MenuButton
		>
		<MenuButton
			size="sm"
			accent="danger"
			onclick={() => {
				game.ennemy.setMode('hard');
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
