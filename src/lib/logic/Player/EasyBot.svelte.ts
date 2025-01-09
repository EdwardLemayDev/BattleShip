import type { Global } from '../Global';
import { getRandomInt } from '../Mode/Mode';
import { Player } from './Player.svelte';

export class EasyBot implements Player {
	readonly id: Player.Id;
	readonly name: string = 'Bot - Easy';
	readonly #logic = new Player.Logic();

	lives: number = $state(5);

	constructor(id: Player.Id, global: Global.Context) {
		this.id = id;

		global.on('start', () => {
			let x: number = 0;
			let y: number = 0;
			let direction: Player.Ship.Direction = 'h';

			for (let ship of this.#logic.fleet.ships) {
				do {
					x = getRandomInt(0, Player.Grid.SIZE - 1);
					y = getRandomInt(0, Player.Grid.SIZE - 1);
					direction = getRandomInt(0, 1) === 0 ? 'h' : 'v';
				} while (!this.#logic.grid.placeShip(x, y, direction, ship));
			}

			global.emit('ready', id);
		});

		global.on('play', (playerId) => {
			if (playerId !== id) return;

			let x: number = 0;
			let y: number = 0;

			do {
				x = getRandomInt(0, Player.Grid.SIZE - 1);
				y = getRandomInt(0, Player.Grid.SIZE - 1);
			} while (!this.#logic.grid.canAttack(x, y));

			setTimeout(() => global.emit('shoot', { playerId: id, x, y }), getRandomInt(500, 1000));
		});

		global.on('shoot', ({ playerId, x, y }) => {
			if (playerId === id) return;

			const result = this.#logic.reportAttack(x, y);
			if (result === 'sink') this.lives--;

			global.emit('report', { playerId: id, x, y, result });
			global.emit('ready', id);
		});

		global.on('report', ({ playerId, x, y, result }) => {
			if (playerId === id) return;

			this.#logic.validateAttack(x, y, result);

			global.emit('ready', id);
		});
	}
}
