import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT_KEY = Symbol();

export type GameStage = 'LOADING' | 'INTRO' | 'MENU' | 'LOBBY';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export class GameLogic {
	static fromContext(): GameLogic | never {
		if (hasContext(CONTEXT_KEY)) return getContext<GameLogic>(CONTEXT_KEY);
		throw new Error('GameLogic was not initialized yet');
	}

	#stage: GameStage = $state('LOADING');
	get stage() {
		return this.#stage;
	}

	gameMode: GameMode = $state('Classic');

	constructor() {
		setContext(CONTEXT_KEY, this);
	}

	loaded() {
		this.#stage = 'INTRO';
	}
	introCompleted() {
		this.#stage = 'MENU';
	}

	createLobby() {
		this.#stage = 'LOBBY';
	}
}
