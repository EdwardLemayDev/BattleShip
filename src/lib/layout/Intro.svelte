<script lang="ts" module>
	import { ANIMATION_DURATION } from '$lib/const';
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

	let stage = $state.raw(IntroStage.SVELTE);
	let skipNoticed = $state(false);

	onMount(async () => {
		const delay = 2000 + ANIMATION_DURATION;

		await sleep(delay);
		stage = IntroStage.TAILWIND;
		await sleep(delay);
		stage = IntroStage.CREATOR;
		await sleep(delay);
		introDone();
	});
</script>

<svelte:window
	onclick={debounce(300, () => {
		if (!skipNoticed) {
			skipNoticed = true;
			return;
		}
		introDone();
	})}
/>

<div
	class="relative flex h-full select-none items-center justify-center overflow-hidden"
	transition:blur={{ duration: ANIMATION_DURATION }}
>
	<div class="flex h-52 w-full max-w-3xl items-start gap-2">
		<h1 class="flex w-28 gap-1.5 overflow-hidden whitespace-pre text-xl font-bold text-neutral-500">
			<span>Made</span>
			<span class="relative">
				{#key stage}
					<span
						style="--accentColor: {stage.color}"
						class="absolute left-0 top-0 text-[--accentColor] underline underline-offset-2"
						in:fly={{ duration: ANIMATION_DURATION, y: -50 }}
						out:fly={{ duration: ANIMATION_DURATION, y: 50 }}
					>
						{stage.tag}
					</span>
				{/key}
			</span>
		</h1>
		<div class="relative h-full flex-grow overflow-hidden">
			{#key stage}
				<div class="absolute left-0 top-1/2 w-full -translate-y-1/2">
					<img
						class="w-full"
						src={stage.src}
						alt={stage.alt}
						transition:blur={{ duration: ANIMATION_DURATION }}
					/>
				</div>
			{/key}
		</div>
	</div>
	{#if skipNoticed}
		<p
			class="absolute bottom-0 left-0 p-6 text-xl font-bold text-neutral-200"
			transition:fly={{ duration: ANIMATION_DURATION, y: 50 }}
		>
			Click to skip
		</p>
	{/if}
</div>
