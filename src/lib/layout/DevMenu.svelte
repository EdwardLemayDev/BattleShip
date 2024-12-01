<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuToggle from '$lib/components/MenuToggle.svelte';
	import { useDevConfig } from '$lib/logic/DevConfig.svelte';
</script>

<script lang="ts">
	const devConfig = useDevConfig();

	const devContent = dev ? devSnippet : undefined;
</script>

{#snippet devSnippet()}
	{#if devConfig}
		<div
			class="absolute left-1 top-1 z-10 flex flex-col items-start gap-1 p-1 font-bold text-neutral-200"
		>
			<button
				class="inline-flex h-8 min-w-8 items-center justify-center overflow-hidden whitespace-pre rounded-full bg-neutral-800 px-2.5 py-0.5 font-bold"
				aria-label="Dev menu"
				onclick={(event) => {
					event.stopImmediatePropagation();
					devConfig.menuOpened = !devConfig.menuOpened;
				}}
			>
				<span>D</span>
				{#if devConfig.menuOpened}
					<span>ev Config</span>
				{/if}
			</button>
			{#if devConfig.menuOpened}
				<MenuToggle bind:value={devConfig.skipIntro}>
					{#snippet children(value)}
						<span>Skip Intro:</span>
						<span class="underline">
							{value ? 'On' : 'Off'}
						</span>
					{/snippet}
				</MenuToggle>
				<MenuToggle bind:value={devConfig.autoLobby}>
					{#snippet children(value)}
						<span>Auto Lobby:</span>
						<span class="underline">
							{value ? 'On' : 'Off'}
						</span>
					{/snippet}
				</MenuToggle>
				<!-- <p>Game Mode: {game.gameMode}</p> -->
			{/if}
		</div>
	{/if}
{/snippet}

{@render devContent?.()}
