<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useGUI } from '$lib/game/GUI.svelte';
	import { useThrottle } from '$lib/utils/throttle';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';
	import { initIntro } from './logic.svelte';

	const INTRO_ANIMATION_DURATION = GLOBAL_ANIMATION_DURATION * 2;
	const INTRO_ANIMATION_DELAY = 1500 + INTRO_ANIMATION_DURATION;
</script>

<script lang="ts">
	const gui = useGUI();
	const intro = initIntro({
		onDone() {
			gui.done();
		},
		delay: INTRO_ANIMATION_DELAY
	});

	onMount(() => intro.start());

	const skipIntro = useThrottle(() => {
		if (intro.showSkipMessage) return intro.skip();

		intro.showSkipMessage = true;
		setTimeout(() => {
			intro.showSkipMessage = false;
		}, 2000);
	}, 250);
</script>

<svelte:window onclick={skipIntro} />

<StageElement>
	{#if intro.meta !== null}
		<div class="flex h-44 w-full max-w-3xl select-none gap-2">
			<div class="w-28">
				<h1 class="overflow-hidden whitespace-pre text-xl font-bold text-neutral-500">
					<span>Made</span>
					<span class="inline-grid grid-cols-1 grid-rows-1">
						{#key intro.state}
							<span
								style:--color={intro.meta.color}
								class="col-start-1 row-start-1 text-[--color] underline underline-offset-2"
								in:fly={{ duration: INTRO_ANIMATION_DURATION, y: -50 }}
								out:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
							>
								{intro.meta.tag}
							</span>
						{/key}
					</span>
				</h1>
			</div>
			<div class="grid flex-grow grid-cols-1 grid-rows-1">
				{#key intro.state}
					<div
						class="col-start-1 row-start-1 grid w-full place-items-center"
						transition:blur={{ duration: INTRO_ANIMATION_DURATION }}
					>
						<img class="w-full" src={intro.meta.src} alt={intro.meta.alt} draggable="false" />
					</div>
				{/key}
			</div>
		</div>
		{#if intro.showSkipMessage}
			<p
				class="absolute bottom-0 left-0 select-none p-6 text-xl font-bold text-neutral-300"
				transition:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
			>
				Click <span class="underline">again</span> to skip
			</p>
		{/if}
	{/if}
</StageElement>
