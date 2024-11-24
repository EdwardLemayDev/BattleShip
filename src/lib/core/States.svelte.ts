import type { CoreLogic } from './Core.svelte';

export type States =
	| 'loading'
	| `intro.${IntroStates}`
	| `menu.${MenuStates}`
	| `lobby.${LobbyStates}`
	| `game.${GameStates}`;

export type IntroStates = 'pending' | 'svelte' | 'tailwindcss' | 'author';
export type MenuStates = 'home' | 'join' | 'settings' | 'about';
export type LobbyStates = 'home' | 'pve' | 'pvp';
export type GameStates = 'idle';

export class CoreStates {
	#core;
	#stateArray = $derived.by(() => this.#core.current.split('.') as Split<States, '.'>);

	readonly main = $derived.by(() => this.#stateArray[0]);
	readonly sub = $derived.by(() => this.#stateArray[1]);

	constructor(core: CoreLogic) {
		this.#core = core;
	}
}
