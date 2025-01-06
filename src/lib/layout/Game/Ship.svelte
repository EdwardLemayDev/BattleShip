<script lang="ts" module>
	import type { LocalPlayer } from '$lib/logic/Player/Local.svelte';
	import type { Player } from '$lib/logic/Player/Player.svelte';
	import { tw } from '$lib/utils/tw';
	import { cva } from 'class-variance-authority';

	export type ShipProps = {
		ship: Player.Ship;
		player: LocalPlayer;
	};

	const shipPreviewStyle = cva('inline-block, grid size-6 place-items-center text-sm', {
		variants: {
			section: {
				start: 'rounded-l-full',
				body: '',
				end: 'rounded-r-full'
			},
			placed: {
				true: '',
				false: 'bg-neutral-700'
			},
			alive: {
				true: '',
				false: ''
			}
		},
		compoundVariants: [
			{
				placed: true,
				alive: true,
				class: 'bg-lime-800'
			},
			{
				placed: true,
				alive: false,
				class: 'bg-red-900'
			}
		]
	});
</script>

<script lang="ts">
	let { ship, player }: ShipProps = $props();
</script>

<button
	class="flex select-none flex-col items-center gap-1 rounded-md border-2 p-2 {player.selectedShip ===
	ship
		? 'border-lime-900'
		: 'border-neutral-800'}"
	disabled={!player.canTrigger('select')}
	onclick={() => player.send('select', ship.id)}
>
	<p class="text-lg font-bold tracking-wider">
		{ship.name}
	</p>
	<div class="overflow-hidden rounded-full">
		<div class="flex justify-center blur-[1px]">
			{#each ship.hits as hit, section}
				<span
					class={tw(
						shipPreviewStyle({
							section: 'body',
							placed: false,
							alive: true
						})
					)}
				></span>
			{/each}
		</div>
	</div>
</button>
