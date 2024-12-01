<script lang="ts" module>
	import type { Snippet } from 'svelte';

	type ValueSnippets<ValuesT extends string> = {
		[Key in ValuesT]: Snippet<[]>;
	};

	type FallbackSnippet<ValuesT extends string> = Snippet<[value: ValuesT]>;

	type CompleteSnippets<ValuesT extends string> = {
		fallback?: FallbackSnippet<ValuesT>;
	} & ValueSnippets<ValuesT>;

	type PartialSnippets<ValuesT extends string> = {
		fallback: FallbackSnippet<ValuesT>;
	} & Partial<ValueSnippets<ValuesT>>;

	export type SwitchSnippets<ValuesT extends string> =
		| CompleteSnippets<ValuesT>
		| PartialSnippets<ValuesT>;

	export type SwitchProps<ValuesT extends string> = {
		value: ValuesT;
	} & SwitchSnippets<ValuesT>;
</script>

<script lang="ts" generics="ValuesT extends string">
	let { value, fallback, ...snippets }: SwitchProps<ValuesT> = $props();

	const snippetCase = $derived.by(() => {
		return (snippets as unknown as SwitchSnippets<ValuesT>)[value];
	});
</script>

{#if snippetCase}
	{@render snippetCase()}
{:else if fallback}
	{@render fallback(value)}
{:else}
	{console.warn(`Invalid Switch state : ${value}`)}
{/if}
