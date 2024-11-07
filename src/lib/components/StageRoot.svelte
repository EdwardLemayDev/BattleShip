<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type StageRootProps = {
		children: Snippet<[]>;
	};
</script>

<script lang="ts">
	let { children }: StageRootProps = $props();
</script>

<div
	class="absolute inset-0 grid grid-cols-1 grid-rows-1 overflow-hidden bg-neutral-950 text-neutral-50"
>
	{@render children()}
</div>
