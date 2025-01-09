<script lang="ts" module>
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import { tw } from '$lib/utils/tw';
	import { cva } from 'class-variance-authority';

	const cardStyle = cva('flex flex-col gap-4 rounded-md border px-4 py-2', {
		variants: {
			player: {
				p1: 'border-lime-950 bg-lime-900/20',
				p2: 'border-amber-950 bg-amber-900/20'
			}
		}
	});

	const titleStyle = cva('text-center text-xl font-bold tracking-wide', {
		variants: {
			player: {
				p1: 'text-lime-100/50',
				p2: 'text-amber-100/50'
			}
		}
	});

	const nameStyle = cva(
		[
			'appearance-none rounded-md border-2 bg-transparent px-1.5 py-0.5',
			'font-semibold outline-none transition-colors'
		],
		{
			variants: {
				player: {
					p1: [
						'border-lime-950 text-lime-100 placeholder:text-lime-800/50',
						'selection:bg-lime-900/50 focus:border-lime-800'
					],
					p2: 'border-amber-950 text-amber-100'
				}
			}
		}
	);
</script>

<script lang="ts">
	const game = useGameLogic();

	const player1 = game.getPlayer(1);
	const player2 = game.getPlayer(2);
</script>

<div class="grid w-full select-none grid-cols-2 gap-4">
	{#if player1 && player2}
		<div class={tw(cardStyle({ player: 'p1' }))}>
			<span class={tw(titleStyle({ player: 'p1' }))}>Player 1</span>
			<input
				class={tw(nameStyle({ player: 'p1' }))}
				type="text"
				name="Ally name"
				id="ally_name"
				placeholder="- Player Name -"
				maxlength="25"
				autocomplete="off"
				bind:value={player1.name}
			/>
		</div>
		<div class={tw(cardStyle({ player: 'p2' }))}>
			<p class={tw(titleStyle({ player: 'p2' }))}>Player 2</p>
			<p class={tw(nameStyle({ player: 'p2' }))}>{player2.name}</p>
		</div>
	{/if}
</div>
