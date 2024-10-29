<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';
	import { ANIMATION_DURATION } from '$lib/const';
	import { GameLogic } from '$lib/logic/Game.svelte';
	import { debounce } from '$lib/utils/debounce';
	import { sleep } from '$lib/utils/sleep';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	export type IntroStage = {
		color: string;
		tag: string;
		src: string;
		alt: string;
	};

	export const INTRO_STAGE = Object.freeze({
		SVELTE: {
			color: '#ff3e00',
			tag: 'with',
			src: '/svelte-horizontal.svg',
			alt: 'Svelte official horizontal logo'
		},
		TAILWINDCSS: {
			color: '#38bdf8',
			tag: 'with',
			src: '/tailwindcss-logotype-white.svg',
			alt: 'Tailwindcss official white logo'
		},
		CREATOR: {
			color: '#BA2D2D',
			tag: 'by',
			src: '/edle-v1.svg',
			alt: 'Personal logo from creator Edward'
		}
	} as const);
</script>

<script lang="ts">
	const game = GameLogic.fromContext();

	let stage: IntroStage | null = $state.raw(null);
	let skipNoticed: boolean = $state(false);

	onMount(async () => {
		const delay = 1500 + ANIMATION_DURATION;

		stage = INTRO_STAGE.SVELTE;
		await sleep(delay);
		stage = INTRO_STAGE.TAILWINDCSS;
		await sleep(delay);
		stage = INTRO_STAGE.CREATOR;
		await sleep(delay);
		game.introCompleted();
	});
</script>

<svelte:window
	onclick={debounce(250, () => {
		if (!skipNoticed) {
			skipNoticed = true;
			setTimeout(() => {
				skipNoticed = false;
			}, 2500);
			return;
		}
		game.introCompleted();
	})}
/>

<StageElement>
	{#if stage !== null}
		<div class="flex h-44 w-full max-w-3xl select-none gap-2">
			<div class="w-28">
				<h1 class="overflow-hidden whitespace-pre text-xl font-bold text-neutral-500">
					<span>Made</span>
					<span class="inline-grid grid-cols-1 grid-rows-1">
						{#key stage}
							<span
								style="--color:{stage.color}"
								class="col-start-1 row-start-1 text-[--color] underline underline-offset-2"
								in:fly={{ duration: ANIMATION_DURATION, y: -50 }}
								out:fly={{ duration: ANIMATION_DURATION, y: 50 }}
							>
								{stage.tag}
							</span>
						{/key}
					</span>
				</h1>
			</div>
			<div class="grid flex-grow grid-cols-1 grid-rows-1">
				{#key stage}
					<div
						class="col-start-1 row-start-1 grid w-full place-items-center"
						transition:blur={{ duration: ANIMATION_DURATION }}
					>
						<img class="w-full" src={stage.src} alt={stage.alt} draggable="false" />
					</div>
				{/key}
			</div>
		</div>
		{#if skipNoticed}
			<p
				class="absolute bottom-0 left-0 select-none p-6 text-xl font-bold text-neutral-300"
				transition:fly={{ duration: ANIMATION_DURATION, y: 50 }}
			>
				Click <span class="underline">again</span> to skip
			</p>
		{/if}
	{/if}
</StageElement>
