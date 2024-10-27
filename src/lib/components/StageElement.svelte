<script lang="ts" module>
	import { ANIMATION_DURATION } from '$lib/const';
	import type { Snippet } from 'svelte';
	import { blur } from 'svelte/transition';

	export type StageElementProps = {
		children: Snippet<[]>;
		static?: boolean;
	};
</script>

<script lang="ts">
	let { children, static: isStatic = false }: StageElementProps = $props();
</script>

<div
	class="col-start-1 row-start-1 grid place-items-center"
	transition:blur={{ duration: isStatic ? 0 : ANIMATION_DURATION }}
>
	{@render children()}
</div>
