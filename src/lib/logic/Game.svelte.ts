import { useStrictContext } from '$lib/class/useContext';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const Game = useStrictContext(
	class GameLogic {
		gameMode: GameMode = $state('Classic');
	}
);
