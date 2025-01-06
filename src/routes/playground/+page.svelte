<script lang="ts">
	import { Game } from '$lib/new_logic/Game.svelte';
	import { LocalPlayer } from '$lib/new_logic/Player/Local.svelte';
	import { useThrottle } from '$lib/utils/throttle';

	const game = new Game();
</script>

{#snippet button(text: string, disabled: boolean, onclick: () => void)}
	<button
		class="w-full min-w-28 rounded-md bg-neutral-800 px-2 disabled:text-neutral-600"
		{disabled}
		{onclick}>{text}</button
	>
{/snippet}

{#snippet p(text: string)}
	<p class="px-1 text-center font-semibold tracking-wider">{text}</p>
{/snippet}

{#snippet title(text: string)}
	<h1 class="text-center text-2xl font-bold tracking-widest">{text}</h1>
{/snippet}

{#snippet separator()}
	<hr class="w-full border-neutral-700" />
{/snippet}

<div
	class="absolute inset-0 grid select-none place-items-center overflow-hidden bg-neutral-900 p-2 text-neutral-50"
>
	<div
		class="grid grid-cols-3 divide-x divide-neutral-600 text-lg *:flex *:flex-col *:items-center *:justify-center *:gap-2 *:px-4"
	>
		<div>
			{@render title('Game')}
			{@render separator()}
			{@render p(`State : ${game.state}`)}
			{@render p(`Role : ${game.role}`)}
			{@render p(`Turn : ${game.turn}`)}
			{@render p(`Mode : ${game.mode}`)}
			{@render button('Reset', !game.canTrigger('reset'), () => game.send('reset'))}
			{@render button('New', !game.canTrigger('new'), () => game.send('new'))}
			{@render button('Start', !game.canTrigger('start'), () => game.send('start'))}
		</div>
		{#each game.players as player}
			<div class="min-w-52">
				{#if player === null}
					{@render title('Player')}
				{:else}
					{@render title(`Player ${player.id}`)}
					{@render separator()}
					{@render p(`Name : ${player.name}`)}
					{#if player instanceof LocalPlayer}
						{@const { fleet, grid } = player.logic}
						{@const flipDirection = useThrottle(() => {
							player.logic.flipSelectDirection();
						}, 250)}

						{@render p(`State : ${player.state}`)}
						{@render p(
							`Result : ${player.state === 'gameOver' ? (player.gameWon ? 'Won' : 'Lost') : '_'}`
						)}
						{@render p(`Hover : ${player.logic.selectDirection}`)}

						<div class="inline-flex border border-neutral-600">
							{#each fleet.ships as ship}
								<button
									class="size-5 border text-xs {ship === fleet.selected
										? 'border-neutral-400'
										: 'border-neutral-600'}"
									aria-label={ship.name}
									disabled={!player.canTrigger('select')}
									onpointerdown={() => player.send('select', ship.id)}
								>
									{ship.id}
								</button>
							{/each}
						</div>

						<div class="inline-grid w-fit grid-cols-10 border border-neutral-600 bg-neutral-800">
							{#each grid.tiles as tile}
								<button
									class="size-3.5 border border-neutral-600 {tile.attackHit === null
										? ''
										: tile.attackHit
											? 'bg-red-400'
											: 'bg-neutral-400'} enabled:hover:border-neutral-400"
									aria-label="{tile.x}.{tile.y}"
									disabled={!player.canTrigger('shoot') || tile.attackHit !== null}
									onpointerdown={() => player.send('shoot', tile.x, tile.y)}
								></button>
							{/each}
						</div>

						<div class="inline-grid w-fit grid-cols-10 border border-neutral-600 bg-neutral-800">
							{#each grid.tiles as tile}
								<button
									class="size-3.5 border border-neutral-600 {tile.reported
										? tile.shipSegment
											? 'bg-red-400'
											: 'bg-neutral-400'
										: tile.shipSegment
											? 'bg-blue-500'
											: ''} enabled:hover:border-neutral-400"
									aria-label="{tile.x}.{tile.y}"
									disabled={!player.canTrigger('place') || fleet.selected === undefined}
									onpointerdown={() => player.send('place', tile.x, tile.y)}
									onwheel={flipDirection}
									title={JSON.stringify(tile.shipSegment)}
								></button>
							{/each}
						</div>
						{@render button('Ready', !player.canTrigger('ready'), () => player.send('ready'))}
					{/if}
				{/if}

				{@render separator()}
				{@render title('Meta')}
				{@render p(`Lives : ${player?.lives}`)}
			</div>
		{/each}
	</div>
</div>
