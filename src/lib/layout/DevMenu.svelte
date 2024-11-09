<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuToggle from '$lib/components/MenuToggle.svelte';
	import { useDevSettings } from '$lib/logic/DevSettings.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
</script>

<script lang="ts">
	const Game = useGameLogic();
	const DevSettings = useDevSettings();
</script>

{#if dev && DevSettings}
	<div
		class="absolute left-1 top-1 z-10 flex select-none flex-col items-start gap-1 p-1 font-bold text-neutral-200"
	>
		<button
			class="inline-flex h-8 min-w-8 items-center justify-center overflow-hidden whitespace-pre rounded-full bg-neutral-800 px-2.5 py-0.5 font-bold"
			aria-label="Dev menu"
			onclick={(event) => {
				event.stopImmediatePropagation();
				DevSettings.menuOpened = !DevSettings.menuOpened;
			}}
		>
			<span>D</span>
			{#if DevSettings.menuOpened}
				<span>ev Config</span>
			{/if}
		</button>
		{#if DevSettings.menuOpened}
			<MenuToggle bind:value={DevSettings.skipIntro}>
				{#snippet children(value)}
					<span>Skip Intro:</span>
					<span class="underline">
						{value ? 'On' : 'Off'}
					</span>
				{/snippet}
			</MenuToggle>
			<MenuToggle bind:value={DevSettings.newLobby}>
				{#snippet children(value)}
					<span>Auto Lobby:</span>
					<span class="underline">
						{value ? 'On' : 'Off'}
					</span>
				{/snippet}
			</MenuToggle>
			<p>Game Mode: {Game.gameMode}</p>
		{/if}
	</div>
{/if}
