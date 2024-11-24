<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuToggle from '$lib/components/MenuToggle.svelte';
	import { useCore } from '$lib/core/Core.svelte';
	import { DevOptions } from '$lib/core/DevOptions.svelte';
</script>

<script lang="ts">
	const { devOptions, states, meta } = useCore();

	const DevSnippet = dev ? Dev : undefined;
</script>

{#snippet Dev()}
	{@const dev = devOptions as DevOptions}
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
				<span>ev Menu</span>
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
				<MenuToggle bind:value={dev.autoLobby}>
					{#snippet children(value)}
						<span>Auto Lobby:</span>
						<span class="underline">
							{value ? 'On' : 'Off'}
						</span>
					{/snippet}
				</MenuToggle>
				<hr class="w-full border-neutral-700" />
				<p>Core: {states.main} - {states.sub}</p>
				<p>Game Mode: {meta.gameMode}</p>
				<hr class="w-full border-neutral-700" />
				<p>Ally: {meta.allyName}</p>
				<hr class="w-full border-neutral-700" />
				<p>Ennemy: {meta.ennemyName}</p>
			</div>
		{/if}
	</div>
{/snippet}

{@render DevSnippet?.()}
