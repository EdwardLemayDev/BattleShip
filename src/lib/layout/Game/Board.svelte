<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useDevLogic } from '$lib/logic/Dev.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import { LocalPlayer } from '$lib/logic/Player/Local.svelte';
	import { blur, fade, scale } from 'svelte/transition';
	import ShipSegment from './ShipSegment.svelte';
	import ShotPin from './ShotPin.svelte';
</script>

<script lang="ts">
	const core = useCoreLogic();
	const game = useGameLogic();
	const devLogic = useDevLogic();

	const player = $derived.by(() => {
		if (dev && devLogic?.playerView) return game.getPlayer(devLogic.playerView);
		return game.getPlayer(1);
	});
</script>

<div
	class="col-start-1 row-start-1 flex select-none flex-col"
	transition:blur={{ duration: GLOBAL_ANIMATION_DURATION }}
>
	{#if player instanceof LocalPlayer}
		<h1 class="text-center text-2xl font-black tracking-widest text-neutral-400">
			{game.mode} Mission
		</h1>
		<div class="flex items-center justify-between p-2 text-lg font-semibold">
			<p>{player.name}'s Fleet</p>
			{#if game.state === 'playing'}
				<p class="transition-colors {game.turn === player.id ? 'text-green-600' : 'text-red-600'}">
					{game.turn === player.id ? 'Attacking' : 'Defending'}
				</p>
			{/if}
		</div>
		<div class="grid grid-flow-col gap-2">
			<div class="flex flex-col gap-1">
				{#each player.ships as ship, id}
					{@const isSelected = player.selectedShip === ship}

					<div
						class="grid gap-2 rounded-md border-2 transition-colors {isSelected
							? 'border-lime-800'
							: 'border-neutral-700'} p-2"
					>
						<p class="text-center text-lg font-bold tracking-wide">
							{ship.name}
						</p>
						<div class="flex justify-center gap-0.5">
							{#each ship.hits as hit, section}
								<span class="relative size-7">
									<ShipSegment
										{id}
										{section}
										direction="h"
										color={ship.placed ? (hit ? '#7f0f0f' : '#878787') : '#252525'}
									/>
								</span>
							{/each}
						</div>
						{#if player.state === 'setup'}
							<button
								class="w-full rounded-md border border-neutral-700 transition-colors enabled:hover:border-lime-700"
								type="button"
								disabled={!player.canTrigger('select') || isSelected}
								onpointerdown={() => player.send('select', id)}
								transition:scale={{ duration: GLOBAL_ANIMATION_DURATION, start: 0.5 }}
							>
								{ship.placed ? 'Move' : isSelected ? 'Placing...' : 'Place'}
							</button>
						{/if}
					</div>
				{/each}

				<div class="flex grow flex-col justify-end gap-1.5">
					{#if player.canTrigger('ready')}
						<MenuButton
							size="sm"
							accent="success"
							outline
							disabled={!player.fleetReady}
							onclick={() => player.send('ready')}
						>
							Ready
						</MenuButton>
					{/if}

					<MenuButton
						size="sm"
						accent="danger"
						outline
						onclick={() => {
							core.quitGame();
							core.createLobby();
						}}
					>
						Quit
					</MenuButton>
				</div>
			</div>
			<div class="relative flex flex-col justify-center gap-2">
				<div class="grid grid-flow-row grid-cols-10 rounded-sm border-2 border-neutral-700">
					{#each player.tiles as tile}
						<button
							class="group relative size-9 bg-neutral-900"
							type="button"
							aria-label="Enemy {tile.tag}"
							tabindex="-1"
							disabled={!player.canTrigger('shoot') || tile.attackHit !== null}
							onpointerdown={() => player.send('shoot', tile.x, tile.y)}
						>
							<span
								class="absolute inset-0 border border-neutral-700 group-enabled:hover:border-neutral-500"
							></span>
							{#if tile.attackHit !== null}
								<ShotPin hit={tile.attackHit} />
							{/if}
						</button>
					{/each}
				</div>
				<div class="grid grid-flow-row grid-cols-10 rounded-sm border-2 border-neutral-700">
					{#each player.tiles as tile}
						<button
							class="relative size-9 bg-neutral-900"
							type="button"
							aria-label="Ally {tile.tag}"
							tabindex="-1"
							disabled={!player.canTrigger('place') || player.fleetReady}
							onwheel={() => {
								player.flipSelectDirection();
								player.send('preview', tile.x, tile.y);
							}}
							onpointerdown={() => player.send('place', tile.x, tile.y)}
							onpointerenter={player.canTrigger('preview')
								? () => player.send('preview', tile.x, tile.y)
								: null}
							onpointerleave={player.canTrigger('clearPreview')
								? () => player.send('clearPreview')
								: null}
						>
							<span class="absolute inset-0 border border-neutral-700"></span>
							{#if tile.placedShipSegment}
								<ShipSegment color="#878787" {...tile.placedShipSegment} />
							{/if}
							{#if tile.previewShipSegment}
								<ShipSegment
									color={tile.placedShipSegment ? '#7f0f0fBB' : '#878787'}
									{...tile.previewShipSegment}
								/>
							{/if}
							{#if tile.reported}
								<ShotPin hit={tile.placedShipSegment !== null} />
							{/if}
						</button>
					{/each}
				</div>

				{#if player.state === 'gameOver'}
					<div
						class="absolute inset-0 grid place-content-center bg-neutral-950/60 text-5xl font-bold backdrop-blur-sm"
						transition:fade={{ duration: GLOBAL_ANIMATION_DURATION }}
					>
						<p>
							<span class="text-neutral-400">Game</span>
							<span class="underline {player.gameWon ? 'text-green-700' : 'text-red-700'}">
								{player.gameWon ? 'Won' : 'Lost'}
							</span>
						</p>
					</div>
				{/if}
			</div>
			<div class="flex flex-col justify-between p-2">
				{#snippet life(amount: number, flip?: 'flip')}
					<div class="flex {flip ? 'flex-col-reverse' : 'flex-col'} gap-1">
						{#each { length: 5 } as _, id}
							<svg
								class="size-7"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									class="stroke-red-600 transition-colors duration-500 {id < amount
										? 'fill-red-700'
										: 'fill-transparent'}"
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{/each}
					</div>
				{/snippet}

				{@render life(player.enemyLives)}
				{@render life(player.lives, 'flip')}
			</div>
		</div>
	{/if}
</div>
