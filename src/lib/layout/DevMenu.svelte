<script lang="ts" module>
	import { dev } from '$app/environment';
	import MenuToggle from '$lib/components/MenuToggle.svelte';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useDevLogic } from '$lib/logic/Dev.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
</script>

<script lang="ts">
	const Content = dev ? devSnippet : undefined;
</script>

{#snippet devSnippet()}
	{@const devLogic = useDevLogic()}
	{@const core = useCoreLogic()}
	{@const game = useGameLogic()}

	{#snippet MenuLabel(title: string)}
		<h2 class="px-1 text-center text-lg font-semibold tracking-wider">{title}</h2>
	{/snippet}

	{#snippet MenuSeparator()}
		<hr class="my-1 border-neutral-700" />
	{/snippet}

	{#snippet MenuData(title: string, data?: any)}
		<p class="flex gap-1 px-1">
			<span>{title}:</span>
			{#if data}
				<span class="grow text-center font-bold">{data}</span>
			{/if}
		</p>
	{/snippet}

	{#if devLogic}
		<div class="absolute left-2 top-2 flex select-none flex-col items-start gap-2 text-neutral-200">
			<button
				class="inline-flex w-full items-center justify-center overflow-hidden whitespace-pre rounded-full bg-neutral-800 px-3 py-0.5 text-lg font-bold"
				aria-label="Dev menu"
				onclick={(event) => {
					event.stopImmediatePropagation();
					devLogic.menuOpened = !devLogic.menuOpened;
				}}
			>
				<span>D</span>
				{#if devLogic.menuOpened}
					<span>ev Menu</span>
				{/if}
			</button>
			{#if devLogic.menuOpened}
				<div class="flex flex-col items-stretch gap-1 px-2">
					<MenuToggle bind:value={devLogic.skipIntro}>
						{#snippet children(value)}
							<span>Skip Intro:</span>
							<span class="font-bold underline">
								{value ? 'On' : 'Off'}
							</span>
						{/snippet}
					</MenuToggle>
					<MenuToggle bind:value={devLogic.autoLobby}>
						{#snippet children(value)}
							<span>Auto Lobby:</span>
							<span class="font-bold underline">
								{value ? 'On' : 'Off'}
							</span>
						{/snippet}
					</MenuToggle>
					{@render MenuSeparator()}
					{@render MenuLabel('Core')}
					{@render MenuData('State', core.state)}
					{@render MenuSeparator()}
					{@render MenuLabel('Game')}
					{@render MenuData('State', game.state)}
					{@render MenuData('Mode', game.mode)}
				</div>
			{/if}
		</div>
	{/if}
{/snippet}

{@render Content?.()}
