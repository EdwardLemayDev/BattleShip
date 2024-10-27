<script lang="ts" module>
	import { useDevConfig } from '$lib/logic/DevConfig.svelte';
</script>

<script lang="ts">
	const devConfig = useDevConfig();
</script>

{#if devConfig}
	<div class="absolute left-0 top-0 z-10 flex w-32 flex-col gap-1 p-1.5 font-bold text-neutral-200">
		<button
			class="inline-flex h-8 w-full items-center justify-center overflow-hidden whitespace-pre rounded-full bg-neutral-800 px-1 py-0.5 font-bold transition-[max-width] {devConfig.menuOpened
				? 'max-w-28'
				: 'max-w-8 text-neutral-400'}"
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
		{#if devConfig?.menuOpened}
			<button
				onclick={(event) => {
					event.stopImmediatePropagation();
					devConfig.skipIntro = !devConfig.skipIntro;
				}}
			>
				<span> Skip Intro: </span>
				<span class="underline">
					{devConfig?.skipIntro ? 'On' : 'Off'}
				</span>
			</button>
		{/if}
	</div>
{/if}
