import { useStateMachine } from '$lib/class/useStateMachine';

export type IntroStages = 'start' | 'svelte' | 'tailwindcss' | 'creator';

export const IntroStage = useStateMachine(
	class IntroCore {
		stage: IntroStages = $state('start');
		showSkip = $state(false);
		done = $state(false);

		color: string = '';
		tag: string = '';
		src: string = '';
		alt: string = '';

		completed: () => void;

		constructor(onCompleted: () => void) {
			this.completed = onCompleted;
		}
	},
	{
		states: ['start', 'svelte', 'tailwindcss', 'creator'],
		events: {
			next: {
				start() {
					return 'svelte';
				},
				svelte() {
					return 'tailwindcss';
				},
				tailwindcss() {
					return 'creator';
				},
				creator() {
					this.completed();
					return 'creator';
				}
			}
		},
		update(state) {
			this.stage = state;

			switch (state) {
				case 'svelte': {
					this.color = '#ff3e00';
					this.tag = 'with';
					this.src = '/svelte-horizontal.svg';
					this.alt = 'Svelte official horizontal logo';

					break;
				}
				case 'tailwindcss': {
					this.color = '#38bdf8';
					this.tag = 'with';
					this.src = '/tailwindcss-logotype-white.svg';
					this.alt = 'Tailwindcss official white logo';

					break;
				}
				case 'creator': {
					this.color = '#BA2D2D';
					this.tag = 'by';
					this.src = '/edle-v1.svg';
					this.alt = 'Personal logo from creator Edward';

					break;
				}
			}
		}
	}
);
