<script lang="ts" module>
	import { dev } from '$app/environment';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useDevLogic } from '$lib/logic/Dev.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';
</script>

<script lang="ts">
	import Toggle from './Toggle.svelte';

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
		<p class="flex gap-3 px-1">
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
					<Toggle
						bind:value={devLogic.skipIntro}
						toggle={(current) => !current}
						format={(value) => (value ? 'On' : 'Off')}
					>
						Skip Intro
					</Toggle>
					<Toggle
						bind:value={devLogic.autoLobby}
						toggle={(current) => !current}
						format={(value) => (value ? 'On' : 'Off')}
					>
						Auto Lobby
					</Toggle>
					<Toggle bind:value={devLogic.playerView} toggle={(current) => (current === 1 ? 2 : 1)}>
						Player view
					</Toggle>

					{@render MenuSeparator()}
					{@render MenuLabel('Core')}
					{@render MenuData('State', core.state)}

					{@render MenuSeparator()}
					{@render MenuLabel('Game')}
					{@render MenuData('State', game.state)}
					{@render MenuData('Type', game.role)}
					{@render MenuData('Mode', game.mode)}
					{@render MenuData('Turn', game.turn)}
					<!-- 
					{@render MenuSeparator()}
					{@render MenuLabel('P1')}
					{@render MenuData('State', game.p1.state)}
					{@render MenuData('Name', game.p1.name)}
					{@render MenuData('Type', game.p1.type)}
					{@render MenuData(
						'Preview',
						`${game.p1.fleet.preview.selected} : ${game.p1.fleet.preview.direction}`
					)}

					{@render MenuSeparator()}
					{@render MenuLabel('P2')}
					{@render MenuData('State', game.p2.state)}
					{@render MenuData('Name', game.p2.name)}
					{@render MenuData('Type', game.p2.type)}
					{@render MenuData(
						'Preview',
						`${game.p2.fleet.preview.selected} : ${game.p2.fleet.preview.direction}`
					)} -->
				</div>
			{/if}
		</div>
	{/if}
{/snippet}

{@render Content?.()}
