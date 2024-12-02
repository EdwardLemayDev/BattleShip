import { sleep } from '$lib/utils/sleep';
import { FiniteStateMachine } from 'runed';

export type IntroStates = 'pending' | 'svelte' | 'tailwindcss' | 'author';
export type IntroEvents = 'start' | 'next' | 'done';

export function initIntro({ onDone, delay }: { onDone: () => void; delay: number }) {
	let introCompleted = false;

	async function queue(event: IntroEvents, ...args: unknown[]) {
		await sleep(delay);
		if (introCompleted) return;
		STATE.send(event, ...args);
	}

	function done() {
		introCompleted = true;
		onDone();
	}

	const STATE = new FiniteStateMachine<IntroStates, IntroEvents>('pending', {
		pending: {
			start: () => {
				introCompleted = false;

				queue('next');
				return 'svelte';
			}
		},
		svelte: {
			next: () => {
				queue('next');
				return 'tailwindcss';
			},
			done
		},
		tailwindcss: {
			next: () => {
				queue('done');
				return 'author';
			},
			done
		},
		author: {
			done
		}
	});

	class Intro {
		get state() {
			return STATE.current;
		}
		get completed() {
			return introCompleted;
		}

		start() {
			STATE.send('start');
		}
		skip() {
			STATE.send('done');
		}
	}

	return new Intro();
}
