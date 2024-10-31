<script lang="ts" module>
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import type { Snippet } from 'svelte';
	import { blur, type BlurParams } from 'svelte/transition';

	export type StageElementProps = {
		children: Snippet<[]>;
		static?: boolean;
	};
</script>

<script lang="ts">
	let { children, static: isStatic = false }: StageElementProps = $props();

	const inConfig: BlurParams = $derived(
		isStatic
			? { duration: 0 }
			: { duration: GLOBAL_ANIMATION_DURATION, delay: GLOBAL_ANIMATION_DURATION / 3 }
	);
	const outConfig: BlurParams = $derived(
		isStatic ? { duration: 0 } : { duration: GLOBAL_ANIMATION_DURATION }
	);
</script>

<div
	class="col-start-1 row-start-1 grid place-items-center"
	in:blur|global={inConfig}
	out:blur|global={outConfig}
>
	{@render children()}
</div>
