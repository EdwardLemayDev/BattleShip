import { Ally } from '$lib/logic/Ally.svelte';
import { Ennemy } from '$lib/logic/Ennemy.svelte';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

class Game {
	mode: GameMode = $state('Classic');

	readonly ally: Ally = new Ally();
	readonly ennemy: Ennemy = new Ennemy();

	resetLobby() {
		this.mode = 'Classic';
		this.ally.reset();
		this.ennemy.reset();
	}
}

export function initGame() {
	return new Game();
}
