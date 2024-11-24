import { dev } from '$app/environment';
import { FiniteStateMachine } from 'runed';
import { getContext, hasContext, setContext } from 'svelte';
import { DevOptions } from './DevOptions.svelte';
import {
	CoreEvents,
	isGotoOption,
	type CoreActions,
	type Events,
	type PopUpOptions
} from './Events.svelte';
import { CoreMeta } from './Meta.svelte';
import { CoreStates, type States } from './States.svelte';

const CONTEXT_KEY = Symbol('CORE_CONTEXT');

export function initCore() {
	return setContext(CONTEXT_KEY, new Core());
}

export function useCore(): CoreInstance | never {
	if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
	throw new Error('Core context is undefined');
}

export type CoreInstance = ReturnType<typeof initCore>;
export type CoreLogic = FiniteStateMachine<States, Events>;

class Core {
	#logic: CoreLogic;

	readonly devOptions?: DevOptions;
	readonly states: CoreStates;
	readonly events: CoreEvents;
	readonly meta: CoreMeta;

	constructor() {
		if (dev) this.devOptions = new DevOptions();

		const app_loaded: CoreActions = dev
			? () => {
					if (this.devOptions?.skipIntro) {
						return this.devOptions.autoLobby ? 'lobby.home' : 'menu.home';
					}
					return 'intro.pending';
				}
			: 'intro.pending';

		const intro_done: CoreActions = dev
			? () => {
					return this.devOptions?.autoLobby ? 'lobby.home' : 'menu.home';
				}
			: 'menu.home';

		const noop: CoreActions = () => {};

		this.#logic = new FiniteStateMachine<States, Events>('loading', {
			loading: { loaded: app_loaded },

			'intro.pending': {
				start: (delay) => {
					this.#logic.debounce(delay as number, 'next', delay);
					return 'intro.svelte';
				}
			},
			'intro.svelte': {
				next: (delay) => {
					this.#logic.debounce(delay as number, 'next', delay);
					return 'intro.tailwindcss';
				},
				done: intro_done
			},
			'intro.tailwindcss': {
				next: (delay) => {
					this.#logic.debounce(delay as number, 'done');
					return 'intro.author';
				},
				done: intro_done
			},
			'intro.author': {
				done: intro_done
			},

			'menu.home': {
				goto: (page) => {
					if (!isGotoOption(page)) return;

					switch (page) {
						case 'lobby':
							return 'lobby.home';
						default:
							return `menu.${page}`;
					}
				}
			},
			'menu.join': {
				back: 'menu.home'
			},
			'menu.settings': {
				back: 'menu.home'
			},
			'menu.about': {
				back: 'menu.home'
			},

			'lobby.home': {
				back: 'menu.home',
				open: (popUp) => `lobby.${popUp as PopUpOptions}`,
				start: 'game.idle'
			},
			'lobby.pve': {
				back: 'lobby.home'
			},
			'lobby.pvp': {
				back: 'lobby.home'
			},

			'game.idle': {},

			'*': {
				next: noop,
				done: noop
			}
		});

		this.states = new CoreStates(this.#logic);
		this.events = new CoreEvents(this.#logic);
		this.meta = new CoreMeta();
	}
}
