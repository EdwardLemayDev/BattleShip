<script lang="ts" module>
	import { dev } from '$app/environment';
	import StageElement from '$lib/components/StageElement.svelte';
	import { ANIMATION_DURATION } from '$lib/const';
	import { useDevConfig } from '$lib/logic/DevConfig.svelte';
	import { debounce } from '$lib/utils/debounce';
	import { sleep } from '$lib/utils/sleep';
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	export type IntroProps = {
		onIntroDone: () => void;
	};

	export class IntroStage {
		static readonly SVELTE = new IntroStage({
			color: '#ff3e00',
			tag: 'with',
			src: '/svelte-horizontal.svg',
			alt: 'Svelte official horizontal logo'
		});
		static readonly TAILWIND = new IntroStage({
			color: '#38bdf8',
			tag: 'with',
			src: '/tailwindcss-logotype-white.svg',
			alt: 'Tailwindcss official white logo'
		});
		static readonly CREATOR = new IntroStage({
			color: '#BA2D2D',
			tag: 'by',
			src: '/edle-v1.svg',
			alt: 'Personal logo from creator Edward'
		});

		color: string;
		tag: string;
		src: string;
		alt: string;

		private constructor(config: { color: string; tag: string; src: string; alt: string }) {
			this.color = config.color;
			this.tag = config.tag;
			this.src = config.src;
			this.alt = config.alt;
		}
	}
</script>

<script lang="ts">
	let { onIntroDone: introDone }: IntroProps = $props();

	let stage: IntroStage | null = $state.raw(null);
	let skipNoticed: boolean = $state(false);

	const devConfig = useDevConfig();

	onMount(async () => {
		if (dev) {
			if (devConfig?.skipIntro) introDone();
		}

		const delay = 1500 + ANIMATION_DURATION;

		stage = IntroStage.SVELTE;
		await sleep(delay);
		stage = IntroStage.TAILWIND;
		await sleep(delay);
		stage = IntroStage.CREATOR;
		await sleep(delay);
		introDone();
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
		introDone();
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
