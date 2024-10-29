import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT_KEY = Symbol();

export type GameStage = 'LOADING' | 'INTRO' | 'MENU';

export class GameLogic {
	static fromContext(): GameLogic | never {
		if (hasContext(CONTEXT_KEY)) return getContext<GameLogic>(CONTEXT_KEY);
		throw new Error('GameLogic was not initialized yet');
	}

	#stage: GameStage = $state('LOADING');
	get stage() {
		return this.#stage;
	}

	constructor() {
		setContext(CONTEXT_KEY, this);
	}

	loaded() {
		this.#stage = 'INTRO';
	}
	introCompleted() {
		this.#stage = 'MENU';
	}
}
