import strictContext from '$lib/utils/context';

const CONTEXT = strictContext<GameLogic>();

export type GameStage = 'LOADING' | 'INTRO' | 'MENU' | 'LOBBY';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

class GameLogic {
	#stage: GameStage = $state('LOADING');
	get stage() {
		return this.#stage;
	}

	gameMode: GameMode = $state('Classic');

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

export function initGameLogic() {
	return CONTEXT.set(new GameLogic());
}

export function useGameLogic() {
	return CONTEXT.get();
}
