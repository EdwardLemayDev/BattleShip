import strictContext from '$lib/utils/context';
import { initGuiState } from './GuiState.svelte';

const Context = strictContext<GameLogic>();

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

class GameLogic {
	#guiState = initGuiState();
	get guiState() {
		return this.#guiState;
	}

	gameMode: GameMode = $state('Classic');
}

export function initGameLogic() {
	return Context.set(new GameLogic());
}

export function useGameLogic() {
	return Context.get();
}
