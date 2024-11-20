import { FiniteStateMachine } from 'runed';

export type IntroStates = 'loading' | 'svelte' | 'tailwindcss' | 'creator' | 'done';
export type IntroEvents = 'start' | 'next' | 'skip';

class Intro extends FiniteStateMachine<IntroStates, IntroEvents> {
	readonly color = $derived.by(() => {
		switch (this.current) {
			case 'svelte':
				return '#ff3e00';
			case 'tailwindcss':
				return '#38bdf8';
			case 'creator':
				return '#BA2D2D';
		}
	});

	readonly tag = $derived.by(() => {
		switch (this.current) {
			case 'svelte':
			case 'tailwindcss':
				return 'with';
			case 'creator':
				return 'by';
		}
	});

	readonly src = $derived.by(() => {
		switch (this.current) {
			case 'svelte':
				return '/svelte-horizontal.svg';
			case 'tailwindcss':
				return '/tailwindcss-logotype-white.svg';
			case 'creator':
				return '/edle-v1.svg';
		}
	});

	readonly alt = $derived.by(() => {
		switch (this.current) {
			case 'svelte':
				return 'Svelte official horizontal logo';
			case 'tailwindcss':
				return 'Tailwindcss official white logo';
			case 'creator':
				return 'Personal logo from creator Edward';
		}
	});

	constructor(callback: () => void, delay: number) {
		super('loading', {
			loading: {
				start: 'svelte'
			},
			svelte: {
				_enter: () => {
					this.debounce(delay, 'next');
				},
				next: 'tailwindcss'
			},
			tailwindcss: {
				_enter: () => {
					this.debounce(delay, 'next');
				},
				next: 'creator'
			},
			creator: {
				_enter: () => {
					this.debounce(delay, 'next');
				},
				next: 'done'
			},
			done: {
				_enter: () => {
					callback();
				},
				next: 'done'
			},

			'*': {
				skip: 'done'
			}
		});
	}
}

export function initIntro(...args: ConstructorParameters<typeof Intro>) {
	return new Intro(...args);
}
