<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useDevLogic } from '$lib/logic/Dev.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import { LocalPlayer } from '$lib/logic/Player/Local.svelte';
	import Ship from './Ship.svelte';
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

<div class="flex select-none flex-col">
	{#if player instanceof LocalPlayer}
		<div class="flex items-center divide-x divide-neutral-700 p-1 *:px-2">
			<p>{player.name}'s Fleet</p>
			<p>Lives : {player.lives}</p>
			<p>Enemy Lives : {player.enemyLives}</p>
		</div>
		<div class="grid grid-flow-col gap-2">
			<div class="flex flex-col gap-1">
				{#each player.ships as ship}
					<Ship {ship} {player} />
				{/each}
				<div class="flex grow flex-col justify-end">
					{#if player.canTrigger('ready')}
						<MenuButton
							size="sm"
							accent="success"
							disabled={!player.fleetReady}
							outline
							onclick={() => player.send('ready')}
						>
							Ready
						</MenuButton>
					{/if}
					{#if game.state === 'gameOver'}
						<MenuButton size="sm" accent="danger" outline onclick={() => core.quitGame()}>
							Quit
						</MenuButton>
					{/if}
				</div>
			</div>
			<div class="flex flex-col justify-center gap-2">
				<div class="grid grid-flow-row grid-cols-10 rounded-sm border-2 border-neutral-700">
					{#each player.tiles as tile}
						<button
							class="group relative size-9 bg-neutral-900"
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
			</div>
		</div>
	{/if}
</div>
