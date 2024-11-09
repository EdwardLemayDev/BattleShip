import { UseContext } from '$lib/utils/class/hook/UseContext';
import { GuiStateLogic } from './GuiState.svelte';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const GameLogic = UseContext(
	class GameLogic {
		#guiState = new GuiStateLogic();
		get guiState() {
			return this.#guiState;
		}

		gameMode: GameMode = $state('Classic');
	}
);
