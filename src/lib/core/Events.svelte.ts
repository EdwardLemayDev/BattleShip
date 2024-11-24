import type { Action } from 'runed';
import type { CoreLogic } from './Core.svelte';
import type { LobbyStates, MenuStates, States } from './States.svelte';

export type Events = 'loaded' | 'start' | 'next' | 'done' | 'goto' | 'back' | 'open';
export type CoreActions = Action<States>;

export type GotoOptions = Exclude<MenuStates, 'home'> | 'lobby';
export type PopUpOptions = Exclude<LobbyStates, 'home'>;

export class CoreEvents {
	#core;

	constructor(core: CoreLogic) {
		this.#core = core;
	}

	loaded() {
		this.#core.send('loaded');
	}

	start(): void;
	start(delay: number): void;
	start(delay?: number) {
		this.#core.send('start', delay);
	}

	done() {
		this.#core.send('done');
	}

	goto(page: GotoOptions) {
		this.#core.send('goto', page);
	}

	back() {
		this.#core.send('back');
	}

	open(popUp: PopUpOptions) {
		this.#core.send('open', popUp);
	}
}

export function isGotoOption(page: unknown): page is GotoOptions {
	switch (page) {
		case 'join':
		case 'settings':
		case 'about':
		case 'lobby':
			return true;
		default:
			return false;
	}
}
