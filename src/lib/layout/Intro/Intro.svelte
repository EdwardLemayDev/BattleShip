<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { GUI } from '$lib/logic/GUI.svelte';
	import { debounce } from '$lib/utils/debounce';
	import { sleep } from '$lib/utils/sleep';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';
	import { IntroStage } from './IntroStage.svelte';

	const INTRO_ANIMATION_DURATION = GLOBAL_ANIMATION_DURATION * 2;
	const INTRO_ANIMATION_DELAY = 1500 + INTRO_ANIMATION_DURATION;

	const INTRO_HIDE_SKIP_DELAY = 2000;
</script>

<script lang="ts">
	const gui = GUI.fromContext();
	const intro = new IntroStage(() => {
		intro.done = true;
		gui.dispatch('completed');
	});

	onMount(async () => {
		while (true) {
			if (intro.done) return;
			intro.dispatch('next');
			await sleep(INTRO_ANIMATION_DELAY);
		}
	});
</script>

<svelte:window
	onclick={debounce(250, () => {
		if (!intro.showSkip) {
			intro.showSkip = true;
			setTimeout(() => {
				intro.showSkip = false;
			}, INTRO_HIDE_SKIP_DELAY);
			return;
		}

		intro.completed();
	})}
/>

<StageElement>
	{#if intro.stage !== 'start'}
		<div class="flex h-44 w-full max-w-3xl select-none gap-2">
			<div class="w-28">
				<h1 class="overflow-hidden whitespace-pre text-xl font-bold text-neutral-500">
					<span>Made</span>
					<span class="inline-grid grid-cols-1 grid-rows-1">
						{#key intro.stage}
							<span
								style="--color:{intro.color}"
								class="col-start-1 row-start-1 text-[--color] underline underline-offset-2"
								in:fly={{ duration: INTRO_ANIMATION_DURATION, y: -50 }}
								out:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
							>
								{intro.tag}
							</span>
						{/key}
					</span>
				</h1>
			</div>
			<div class="grid flex-grow grid-cols-1 grid-rows-1">
				{#key intro.stage}
					<div
						class="col-start-1 row-start-1 grid w-full place-items-center"
						transition:blur={{ duration: INTRO_ANIMATION_DURATION }}
					>
						<img class="w-full" src={intro.src} alt={intro.alt} draggable="false" />
					</div>
				{/key}
			</div>
		</div>
		{#if intro.showSkip}
			<p
				class="absolute bottom-0 left-0 select-none p-6 text-xl font-bold text-neutral-300"
				transition:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
			>
				Click <span class="underline">again</span> to skip
			</p>
		{/if}
	{/if}
</StageElement>
