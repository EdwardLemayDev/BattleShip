import { useStrictContext } from '$lib/class/useContext';
import { Ally } from './Ally.svelte';
import { Ennemy } from './Ennemy.svelte';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const Game = useStrictContext(
	class GameLogic {
		ally: Ally = new Ally();
		ennemy: Ennemy = new Ennemy();

		mode: GameMode = $state('Classic');

		resetLobby() {
			this.mode = 'Classic';

			this.ally.reset();
			this.ennemy.reset();
		}
	}
);
