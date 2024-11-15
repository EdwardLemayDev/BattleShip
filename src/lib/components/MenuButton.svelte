<script lang="ts" module>
	import { tw } from '$lib/utils/tw';
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

	const buttonStyles = {
		base: tw(
			'group relative inline-flex select-none items-center justify-center border font-bold transition-colors'
		),

		size: {
			sm: tw('rounded-md px-6 py-2 text-xl'),
			md: tw('rounded-md px-8 py-2.5 text-2xl'),
			lg: tw('rounded-lg px-10 py-3 text-3xl')
		},

		outline: {
			enable: tw('overflow-hidden border-neutral-800'),
			disable: tw('border-transparent')
		},

		accent: {
			neutral: tw('text-neutral-400 hover:text-neutral-100'),
			warning: tw('text-yellow-500 hover:text-yellow-200'),
			danger: tw('text-red-500 hover:text-red-200'),
			success: tw('text-green-500 hover:text-green-200')
		}
	};

	const backdropStyles = {
		base: tw(
			'absolute h-full w-full max-w-0 opacity-0 blur-sm transition-[transform,_max-width,_opacity]',
			'group-hover:max-w-full group-hover:opacity-100 group-active:scale-90'
		),

		size: {
			sm: tw('rounded-md'),
			md: tw('rounded-md'),
			lg: tw('rounded-lg')
		},

		accent: {
			neutral: tw('bg-neutral-800'),
			warning: tw('bg-yellow-900/40'),
			danger: tw('bg-red-900/40'),
			success: tw('bg-green-900/40')
		}
	};
</script>

<script lang="ts">
	let {
		size = 'md',
		outline = false,
		accent = 'neutral',
		onclick,
		children
	}: MenuButtonProps = $props();

	const buttonClasses = $derived(
		tw(
			buttonStyles.base,
			buttonStyles.size[size],
			outline ? buttonStyles.outline.enable : buttonStyles.outline.disable,
			buttonStyles.accent[accent]
		)
	);
	const backdropClasses = $derived(
		tw(backdropStyles.base, backdropStyles.size[size], backdropStyles.accent[accent])
	);
</script>

<button type="button" class={buttonClasses} {onclick}>
	<span class={backdropClasses}></span>
	<span class="relative">{@render children()}</span>
</button>
