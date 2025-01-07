import type { Global } from '../Global';
import type { Player } from '../Player/Player.svelte';
import { getRandomInt, type Mode } from './Mode';

export class Salvo implements Mode {
	readonly name: Mode.Name = 'Salvo';

	turn: Player.Id = $state(1);

	#totalShots: [number, number] = $state([5, 5]);
	#currentShots: number = $state(0);

	constructor(global: Global.Context) {
		global.on('firstTurn', () => {
			this.turn = getRandomInt(1, 2) as Player.Id;

			global.emit('play', this.turn);
		});

		global.on('nextTurn', () => {
			this.#currentShots++;

			if (this.#currentShots === this.#totalShots[this.turn - 1]) {
				this.#currentShots = 0;
				this.turn = this.turn === 1 ? 2 : 1;
			}

			global.emit('play', this.turn);
		});

		global.on('report', ({ playerId, result }) => {
			if (result === 'sink') this.#totalShots[playerId - 1]--;
		});
	}
}
