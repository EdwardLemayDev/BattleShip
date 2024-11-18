<script lang="ts" module>
	import MenuToggle from '$lib/components/MenuToggle.svelte';
	import { Game } from '$lib/logic/Game.svelte';
	import { Dev } from '.';
</script>

<script lang="ts">
	const dev = Dev && Dev.fromContext();
	const game = Game.fromContext();
</script>

{#if dev}
	<div
		class="absolute left-2 top-2 z-10 flex select-none flex-col items-start gap-1 p-1 font-bold text-neutral-200"
	>
		<button
			class="inline-flex h-8 min-w-8 items-center justify-center overflow-hidden whitespace-pre rounded-full bg-neutral-800 px-2.5 py-0.5 font-bold"
			aria-label="Dev menu"
			onclick={(event) => {
				event.stopImmediatePropagation();
				dev.menuOpened = !dev.menuOpened;
			}}
		>
			<span>D</span>
			{#if dev.menuOpened}
				<span>ev Config</span>
			{/if}
		</button>
		{#if dev.menuOpened}
			<div class="flex flex-col items-start gap-1 p-2">
				<MenuToggle bind:value={dev.skipIntro}>
					{#snippet children(value)}
						<span>Skip Intro:</span>
						<span class="underline">
							{value ? 'On' : 'Off'}
						</span>
					{/snippet}
				</MenuToggle>
				<MenuToggle bind:value={dev.newLobby}>
					{#snippet children(value)}
						<span>Auto Lobby:</span>
						<span class="underline">
							{value ? 'On' : 'Off'}
						</span>
					{/snippet}
				</MenuToggle>
				<hr class="w-full border-neutral-700" />
				<p>Game Mode: {game.mode}</p>
				<p>Ally Name: {game.ally.name}</p>
				<p>Ennemy Name: {game.ennemy.name}</p>
			</div>
		{/if}
	</div>
{/if}
