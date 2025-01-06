import type { Global } from '../Global';
import type { Player } from '../Player/Player.svelte';
import { getRandomInt, type Mode } from './Mode';

export class Classic implements Mode {
	readonly name: Mode.Name = 'Classic';

	turn: Player.Id = $state(1);

	constructor(global: Global.Context) {
		global.on('firstTurn', () => {
			this.turn = getRandomInt(1, 2) as Player.Id;

			global.emit('play', this.turn);
		});

		global.on('nextTurn', () => {
			this.turn = this.turn === 1 ? 2 : 1;

			global.emit('play', this.turn);
		});
	}
}
