<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCore } from '$lib/core/Core.svelte';
	import type { LobbyStates } from '$lib/core/States.svelte';
	import { fade, scale } from 'svelte/transition';
</script>

<script lang="ts">
	const { states, events } = useCore();

	const CurrentPopUp = $derived.by(() => {
		switch (states.sub as LobbyStates) {
			case 'home':
				return undefined;
			case 'pve':
				return PvEPopUp;
			case 'pvp':
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
				events.setBot('easy');
			}}>Easy</MenuButton
		>
		<MenuButton
			size="sm"
			accent="warning"
			onclick={() => {
				events.setBot('medium');
			}}>Medium</MenuButton
		>
		<MenuButton
			size="sm"
			accent="danger"
			onclick={() => {
				events.setBot('hard');
			}}>Hard</MenuButton
		>
	</div>
	<div class="grid w-full grid-cols-1">
		<MenuButton
			onclick={() => {
				events.back();
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
				events.back();
			}}>Back</MenuButton
		>
	</div>
{/snippet}

{#if states.sub !== 'home'}
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
