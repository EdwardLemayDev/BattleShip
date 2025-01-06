<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ToggleProps<ValueT, FormatedT> = {
		value: ValueT;
		toggle: (current: ValueT) => ValueT;

		format?: (value: ValueT) => FormatedT;
		children: Snippet<[]>;
	};
</script>

<script lang="ts" generics="ValueT, FormatedT = unknown">
	let { value = $bindable(), toggle, format, children }: ToggleProps<ValueT, FormatedT> = $props();
</script>

<button
	class="text-neutral-200"
	onclick={(event) => {
		event.stopImmediatePropagation();
		value = toggle(value);
	}}
>
	<span>{@render children()} : </span>
	<span class="font-bold underline">{format ? format(value) : value}</span>
</button>
