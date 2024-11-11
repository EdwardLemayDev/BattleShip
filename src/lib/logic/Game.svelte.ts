import { useContext } from '$lib/class/useContext';
import { GuiStateLogic } from './GuiState.svelte';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const GameLogic = useContext(
	class GameLogic {
		#guiState = new GuiStateLogic();
		get guiState() {
			return this.#guiState;
		}

		gameMode: GameMode = $state('Classic');
	}
);
