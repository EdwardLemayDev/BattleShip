import { useContext } from '$lib/utils/context';

export type GameStage = 'LOADING' | 'INTRO' | 'MENU' | 'LOBBY';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const [initGameLogic, useGameLogic] = useContext(Symbol('GameLogic Context'), () => {
	class GameLogic {
		gameMode: GameMode = $state('Classic');
	}

	return new GameLogic();
});
