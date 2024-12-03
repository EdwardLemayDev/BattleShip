<script lang="ts" module>
	import { tw } from '$lib/utils/tw';
	import { cva } from 'class-variance-authority';
	import type { Snippet } from 'svelte';

	export type MenuButtonProps = {
		size?: 'sm' | 'md' | 'lg';
		outline?: boolean;
		accent?: 'neutral' | 'warning' | 'danger' | 'success';

		onclick?: (
			event: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => void;

		children: Snippet<[]>;
	};

	const buttonStyle = cva(
		[
			'group relative inline-flex select-none items-center',
			'justify-center border font-bold transition-colors'
		],
		{
			variants: {
				size: {
					sm: 'rounded-md px-6 py-2 text-xl',
					md: 'rounded-md px-8 py-2.5 text-2xl',
					lg: 'rounded-lg px-10 py-3 text-3xl'
				},
				outline: {
					true: 'overflow-hidden border-neutral-800',
					false: 'border-transparent'
				},
				accent: {
					neutral: 'text-neutral-400 hover:text-neutral-100',
					warning: 'text-yellow-600 hover:text-yellow-200',
					danger: 'text-red-600 hover:text-red-200',
					success: 'text-green-600 hover:text-green-200'
				}
			}
		}
	);

	const backdropStyle = cva(
		[
			'absolute h-full w-full max-w-0 opacity-0',
			'blur-sm transition-[transform,_max-width,_opacity]',
			'group-hover:max-w-full group-hover:opacity-100 group-active:scale-90'
		],
		{
			variants: {
				size: {
					sm: 'rounded-md',
					md: 'rounded-md',
					lg: 'rounded-lg'
				},
				accent: {
					neutral: 'bg-neutral-800',
					warning: 'bg-yellow-900/40',
					danger: 'bg-red-900/40',
					success: 'bg-green-900/40'
				}
			}
		}
	);
</script>

<script lang="ts">
	let {
		size = 'md',
		outline = false,
		accent = 'neutral',
		onclick,
		children
	}: MenuButtonProps = $props();
</script>

<button type="button" class={tw(buttonStyle({ size, outline, accent }))} {onclick}>
	<span class={tw(backdropStyle({ size, accent }))}></span>
	<span class="relative">{@render children()}</span>
</button>
