<script lang="ts" module>
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { useThrottle } from '$lib/utils/throttle';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';
	import { initIntro, type IntroStates } from './logic.svelte';

	const INTRO_META: Record<
		IntroStates,
		{
			color: string;
			tag: string;
			src: string;
			alt: string;
		} | null
	> = {
		pending: null,
		svelte: {
			color: '#ff3e00',
			tag: 'with',
			src: '/svelte-horizontal.svg',
			alt: 'Svelte official horizontal logo'
		},
		tailwindcss: {
			color: '#38bdf8',
			tag: 'with',
			src: '/tailwindcss-logotype-white.svg',
			alt: 'Tailwindcss official white logo'
		},
		author: {
			color: '#BA2D2D',
			tag: 'by',
			src: '/edle-v1.svg',
			alt: 'Personal logo from author Edward'
		}
	};

	const INTRO_ANIMATION_DURATION = GLOBAL_ANIMATION_DURATION * 2;
	const INTRO_ANIMATION_DELAY = 1500 + INTRO_ANIMATION_DURATION;
</script>

<script lang="ts">
	const core = useCoreLogic();
	const intro = initIntro({
		onDone() {
			core.introDone();
		},
		delay: INTRO_ANIMATION_DELAY
	});

	onMount(() => intro.start());

	let showSkipMessage = $state(false);
	const meta = $derived(INTRO_META[intro.state]);

	const skipIntro = useThrottle(() => {
		if (intro.completed) return;

		if (showSkipMessage) return intro.skip();

		showSkipMessage = true;
		setTimeout(() => {
			showSkipMessage = false;
		}, INTRO_ANIMATION_DELAY);
	}, INTRO_ANIMATION_DURATION);
</script>

<svelte:window onclick={skipIntro} />

{#if meta}
	{@const { color, tag, src, alt } = meta}
	<div class="flex h-44 w-full max-w-3xl select-none gap-2">
		<h1
			class="relative h-fit w-28 overflow-hidden whitespace-pre text-xl font-bold text-neutral-500"
		>
			<span>Made</span>
			{#key meta}
				<span
					style:--color={color}
					class="absolute text-[--color] underline underline-offset-2"
					in:fly={{ duration: INTRO_ANIMATION_DURATION, y: -50 }}
					out:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
				>
					{tag}
				</span>
			{/key}
		</h1>
		<div class="relative grow">
			{#key meta}
				<div
					class="absolute inset-0 grid place-items-center"
					transition:blur={{ duration: INTRO_ANIMATION_DURATION }}
				>
					<img class="w-full" {src} {alt} draggable="false" />
				</div>
			{/key}
		</div>
	</div>
	{#if showSkipMessage}
		<p
			class="absolute bottom-0 left-0 select-none p-6 text-xl font-bold text-neutral-300"
			transition:fly={{ duration: INTRO_ANIMATION_DURATION, y: 50 }}
		>
			Click <span class="underline">again</span> to skip
		</p>
	{/if}
{/if}
