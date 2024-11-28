import { dev } from '$app/environment';
import { sleep } from '$lib/utils/sleep';
import { type ApiType, type CoreAction, type CoreTransition, type ModuleContext } from './module';

export type IntroStates = `intro_${IntroSubStates}`;
export type IntroSubStates = 'pending' | 'svelte' | 'tailwindcss' | 'author';

export type IntroEvents = `intro_${'start' | 'next' | 'done'}`;

export type IntroTransitions = CoreTransition<IntroStates, IntroEvents>;
export type IntroApi = ApiType<typeof initIntroModule>;

export function initIntroModule({ send, core: { devOptions } }: ModuleContext) {
	let introCompleted = false;

	const intro_done: CoreAction = () => {
		introCompleted = true;
		if (dev && devOptions?.autoLobby) return 'lobby_home';
		return 'menu_home';
	};

	async function queue(delay: number, event: IntroEvents) {
		await sleep(delay);
		if (introCompleted) return;
		send(event, delay);
	}

	const transition: IntroTransitions = {
		intro_pending: {
			intro_start: (delay) => {
				introCompleted = false;
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

	const api = class IntroApi {
		start(delay: number) {
			send('intro_start', delay);
		}
		skip() {
			send('intro_done');
		}
	};

	return [transition, api] as const;
}
