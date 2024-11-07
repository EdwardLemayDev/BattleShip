<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type MenuToggleProps = {
		value: boolean;
		disabled?: boolean;

		children: Snippet<[value: boolean]>;
	};
</script>

<script lang="ts">
	let { value = $bindable(), disabled = false, children }: MenuToggleProps = $props();
</script>

<button
	class="text-neutral-200 disabled:text-neutral-500"
	{disabled}
	onclick={disabled
		? null
		: (event) => {
				event.stopImmediatePropagation();
				value = !value;
			}}
>
	{@render children(value)}
</button>
