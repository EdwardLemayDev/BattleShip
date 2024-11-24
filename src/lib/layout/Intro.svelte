<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCore } from '$lib/core/Core.svelte';
	import type { IntroStates } from '$lib/core/States.svelte';
	import { useThrottle } from '$lib/utils/useThrottle';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	const INTRO_ANIMATION_DURATION = GLOBAL_ANIMATION_DURATION * 2;
	const INTRO_ANIMATION_DELAY = 1500 + INTRO_ANIMATION_DURATION;
	const INTRO_HIDE_SKIP_DELAY = 2000;

	class IntroMeta {
		readonly #current;

		showSkip = $state(false);

		readonly color = $derived.by(() => {
			switch (this.#current()) {
				case 'svelte':
					return '#ff3e00';
				case 'tailwindcss':
					return '#38bdf8';
				case 'author':
					return '#BA2D2D';
			}
		});

		readonly tag = $derived.by(() => {
			switch (this.#current()) {
				case 'svelte':
				case 'tailwindcss':
					return 'with';
				case 'author':
					return 'by';
			}
		});

		readonly src = $derived.by(() => {
			switch (this.#current()) {
				case 'svelte':
					return '/svelte-horizontal.svg';
				case 'tailwindcss':
					return '/tailwindcss-logotype-white.svg';
				case 'author':
					return '/edle-v1.svg';
			}
		});

		readonly alt = $derived.by(() => {
			switch (this.#current()) {
				case 'svelte':
					return 'Svelte official horizontal logo';
				case 'tailwindcss':
					return 'Tailwindcss official white logo';
				case 'author':
					return 'Personal logo from author Edward';
			}
		});

		constructor(current: () => IntroStates) {
			this.#current = current;
		}
	}
</script>

<script lang="ts">
	const { states, events } = useCore();
	const meta = new IntroMeta(() => states.sub as IntroStates);

	onMount(() => {
		events.start(INTRO_ANIMATION_DELAY);
	});

	const skipIntro = useThrottle(() => {
		if (!meta.showSkip) {
			meta.showSkip = true;
			setTimeout(() => {
				meta.showSkip = false;
			}, INTRO_HIDE_SKIP_DELAY);
			return;
		}

		events.done();
	}, 250);
</script>

<svelte:window onclick={skipIntro} />

<StageElement>
	{#if states.sub !== 'pending'}
		<div class="flex h-44 w-full max-w-3xl select-none gap-2">
			<div class="w-28">
				<h1 class="overflow-hidden whitespace-pre text-xl font-bold text-neutral-500">
					<span>Made</span>
					<span class="inline-grid grid-cols-1 grid-rows-1">
						{#key states.sub}
							<span
								style:--color={meta.color}
								class="col-start-1 row-start-1 text-[--color] underline underline-offset-2"
								in:fly={{ duration: INTRO_ANIMATION_DURATION, y: -50 }}
								out:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
							>
								{meta.tag}
							</span>
						{/key}
					</span>
				</h1>
			</div>
			<div class="grid flex-grow grid-cols-1 grid-rows-1">
				{#key states.sub}
					<div
						class="col-start-1 row-start-1 grid w-full place-items-center"
						transition:blur={{ duration: INTRO_ANIMATION_DURATION }}
					>
						<img class="w-full" src={meta.src} alt={meta.alt} draggable="false" />
					</div>
				{/key}
			</div>
		</div>
		{#if meta.showSkip}
			<p
				class="absolute bottom-0 left-0 select-none p-6 text-xl font-bold text-neutral-300"
				transition:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
			>
				Click <span class="underline">again</span> to skip
			</p>
		{/if}
	{/if}
</StageElement>
