import { dev } from '$app/environment';
import { FiniteStateMachine } from 'runed';
import { getContext, hasContext, setContext } from 'svelte';
import { DevOptions } from './DevOptions.svelte';
import {
	initIntroTransitions,
	IntroApi,
	type IntroEvents,
	type IntroStates
} from './logic/intro.svelte';
import { initLobbyTransitions, LobbyApi, type LobbyStates } from './logic/lobby.svelte';
import {
	initMenuTransitions,
	MenuApi,
	type MenuEvents,
	type MenuStates
} from './logic/menu.svelte';
import type { ModuleContext } from './logic/module';

export type CoreStates = 'loading' | IntroStates | MenuStates | LobbyStates;

export type CoreEvents = 'loaded' | IntroEvents | MenuEvents;

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
	readonly states: States;

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
			...initIntroTransitions(context),
			...initMenuTransitions(context),
			...initLobbyTransitions(context)
		});

		this.states = new States(this.#logic);

		this.intro = new IntroApi(context);
		this.menu = new MenuApi(context);
		this.lobby = new LobbyApi(context);
	}
}

class States {
	#core: CoreLogic;
	readonly #states = $derived.by(() => {
		return this.#core.current.split('_') as Split<CoreStates, '_'>;
	});

	readonly main = $derived.by(() => this.#states[0]);
	readonly sub = $derived.by(() => this.#states[1]);

	constructor(core: CoreLogic) {
		this.#core = core;
	}
}
