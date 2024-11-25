import { dev } from '$app/environment';
import { sleep } from '$lib/utils/sleep';
import { newTransitionModule, type CoreAction, type ModuleContext } from './module';

export type IntroStates = `intro_${IntroSubStates}`;
export type IntroSubStates = 'pending' | 'svelte' | 'tailwindcss' | 'author';

export type IntroEvents = `intro_${'start' | 'next' | 'done'}`;

export const initIntroTransitions = newTransitionModule<IntroStates, IntroEvents>(
	({ core: { devOptions }, send }) => {
		let intro_skipped = false;

		async function queue(delay: number, event: IntroEvents) {
			await sleep(delay);
			if (intro_skipped) return;
			send(event, delay);
		}

		const intro_done: CoreAction = () => {
			intro_skipped = true;
			if (dev && devOptions?.autoLobby) return 'lobby_home';
			return 'menu_home';
		};

		return {
			intro_pending: {
				intro_start: (delay) => {
					intro_skipped = false;
					queue(delay as number, 'intro_next');
					return 'intro_svelte';
				}
			},
			intro_svelte: {
				intro_next: (delay) => {
					queue(delay as number, 'intro_next');
					return 'intro_tailwindcss';
				},
				intro_done
			},
			intro_tailwindcss: {
				intro_next: (delay) => {
					queue(delay as number, 'intro_done');
					return 'intro_author';
				},
				intro_done
			},
			intro_author: {
				intro_done
			}
		};
	}
);

export class IntroApi {
	#send: ModuleContext['send'];

	constructor({ send }: ModuleContext) {
		this.#send = send;
	}

	start(delay: number) {
		this.#send('intro_start', delay);
	}
	skip() {
		this.#send('intro_done');
	}
}
