<script lang="ts" module>
	import { tw } from '$lib/utils/tw';
	import { type Snippet } from 'svelte';

	export type PageProps = {
		title: string;
		align?: 'left' | 'center' | 'right';
		titleSize?: 'sm' | 'md' | 'lg';

		children?: Snippet<[]>;
	};

	const titleStyles = {
		base: tw(
			'flex min-h-24 select-none items-center justify-center font-bold tracking-widest text-neutral-100'
		),

		size: {
			sm: tw('text-6xl'),
			md: tw('text-7xl'),
			lg: tw('text-8xl')
		}
	};
</script>

<script lang="ts">
	let { title, titleSize = 'md', children }: PageProps = $props();

	const titleClasses = $derived(tw(titleStyles.base, titleStyles.size[titleSize]));
</script>

<div class="flex min-h-[25rem] w-full max-w-xl flex-col items-center gap-10">
	<h1 class={titleClasses}>
		{title}
	</h1>
	<div class="flex w-full max-w-md flex-col gap-2">
		{@render children?.()}
	</div>
</div>
