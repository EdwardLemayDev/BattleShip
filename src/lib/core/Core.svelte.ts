import { dev } from '$app/environment';
import { FiniteStateMachine } from 'runed';
import { getContext, hasContext, setContext } from 'svelte';
import { DevOptions } from './DevOptions.svelte';
import {
	initIntroModule,
	type IntroApi,
	type IntroEvents,
	type IntroStates
} from './logic/intro.svelte';
import {
	initLobbyModule,
	type LobbyApi,
	type LobbyEvents,
	type LobbyStates
} from './logic/lobby.svelte';
import {
	initMenuModule,
	type MenuApi,
	type MenuEvents,
	type MenuStates
} from './logic/menu.svelte';
import type { ModuleContext } from './logic/module';
import { initStates, type CoreStatesObject } from './States.svelte';

export type CoreStates = 'loading' | IntroStates | MenuStates | LobbyStates;
export type CoreEvents = 'loaded' | IntroEvents | MenuEvents | LobbyEvents;

export type CoreLogic = FiniteStateMachine<CoreStates, CoreEvents>;
export type CoreInstance = ReturnType<typeof initCore>;

const CONTEXT_KEY = Symbol('CORE_CONTEXT');

export function initCore() {
	return setContext(CONTEXT_KEY, new Core());
}

export function useCore(): CoreInstance | never {
	if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
	throw new Error('Core context is undefined');
}

class Core {
	readonly #logic: CoreLogic;

	readonly devOptions?: DevOptions;
	readonly states: CoreStatesObject;

	readonly intro: IntroApi;
	readonly menu: MenuApi;
	readonly lobby: LobbyApi;

	loaded = () => {
		this.#logic.send('loaded');
	};

	constructor() {
		if (dev) this.devOptions = new DevOptions();

		const context: ModuleContext = Object.freeze({
			core: this,
			send: (...args) => this.#logic.send(...args),
			debounce: async (...args) => await this.#logic.debounce(...args)
		});

		const [introTransitions, IntroApi] = initIntroModule(context);
		const [menuTransitions, MenuApi] = initMenuModule(context);
		const [lobbyTransitions, LobbyApi] = initLobbyModule(context);

		this.#logic = new FiniteStateMachine<CoreStates, CoreEvents>('loading', {
			loading: {
				loaded: dev
					? () => {
							if (this.devOptions?.skipIntro) {
								return this.devOptions.autoLobby ? 'lobby_home' : 'menu_home';
							}
							return 'intro_pending';
						}
					: 'intro_pending'
			},
			...introTransitions,
			...menuTransitions,
			...lobbyTransitions,
			'*': {}
		});

		this.states = initStates(() => this.#logic.current);

		this.intro = new IntroApi();
		this.menu = new MenuApi();
		this.lobby = new LobbyApi();
	}
}
