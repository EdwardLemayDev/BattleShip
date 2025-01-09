import type { Global } from '../Global';
import type { Player } from '../Player/Player.svelte';
import { getRandomInt, type Mode } from './Mode';

export class Bonus implements Mode {
	name: Mode.Name = 'Bonus';

	turn: Player.Id = $state(1);

	constructor(global: Global.Context) {
		global.on('firstTurn', () => {
			this.turn = getRandomInt(1, 2) as Player.Id;

			global.emit('play', this.turn);
		});

		global.on('report', ({ result }) => {
			if (result === 'miss') this.turn = this.turn === 1 ? 2 : 1;
		});

		global.on('nextTurn', () => {
			global.emit('play', this.turn);
		});
	}
}
