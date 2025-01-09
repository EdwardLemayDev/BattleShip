import { getLocal, saveLocal } from '$lib/utils/local.svelte';
import { SvelteStateMachine } from '$lib/utils/SvelteStateMachine.svelte';
import { useThrottle } from '$lib/utils/throttle';
import { useDebounce } from 'runed';
import type { Global } from '../Global';
import { Player } from './Player.svelte';

export class LocalPlayer
	extends SvelteStateMachine<LocalPlayer.States, LocalPlayer.Events>
	implements Player
{
	readonly id: Player.Id;
	readonly #logic = new Player.Logic();

	#name: string | null = $state(null);
	lives: number = $state(5);

	gameWon: boolean = $state(false);
	enemyLives: number = $state(5);

	get name() {
		if (this.#name !== null) return this.#name;

		this.#name = getLocal('player_name') ?? '';
		return this.#name;
	}

	#updateLocal = useDebounce((newName: string) => {
		saveLocal('player_name', newName);
	}, 500);

	set name(newName: string) {
		if (newName === this.#name) return;

		this.#name = newName;
		this.#updateLocal(newName);
	}

	get ships() {
		return this.#logic.fleet.ships;
	}

	get selectedShip() {
		return this.#logic.fleet.selected;
	}

	get fleetReady() {
		return this.#logic.fleet.ready;
	}

	get tiles() {
		return this.#logic.grid.tiles;
	}

	get selectDirection() {
		return this.#logic.selectDirection;
	}

	flipSelectDirection = useThrottle(() => {
		this.#logic.flipSelectDirection();
	}, 250);

	constructor(id: Player.Id, global: Global.Context) {
		super('idle', {
			idle: {
				start: () => 'setup'
			},

			setup: {
				_enter: () => {
					this.#logic.selectShip(0);
				},

				ready: () => {
					if (this.#logic.fleet.ready) return 'waiting';
				},

				select: (id) => {
					this.#logic.selectShip(id);
				},

				preview: (x, y) => {
					this.#logic.previewShip(x, y);
				},

				clearPreview: () => {
					this.#logic.clearPreview();
				},

				place: (x, y) => {
					this.#logic.placeShip(x, y);
				}
			},

			waiting: {
				_enter: () => {
					global.emit('ready', id);
				},

				attack: () => 'attacking',
				defend: () => 'defending',
				gameOver: () => 'gameOver'
			},

			attacking: {
				shoot: (x, y) => {
					global.emit('shoot', {
						playerId: id,
						x,
						y
					});

					return 'validating';
				}
			},

			validating: {
				validate: (x, y, result) => {
					this.#logic.validateAttack(x, y, result);
					if (result === 'sink') this.enemyLives--;

					return 'waiting';
				}
			},

			defending: {
				report: (x, y) => {
					const result = this.#logic.reportAttack(x, y);
					if (result === 'sink') this.lives--;

					global.emit('report', { playerId: id, x, y, result });

					return 'waiting';
				}
			},

			gameOver: {}
		});

		this.id = id;

		global.on('start', () => {
			this.send('start');
		});

		global.on('play', (playerId) => {
			if (playerId === id) this.send('attack');
			else this.send('defend');
		});

		global.on('shoot', ({ playerId, x, y }) => {
			if (playerId === id) return;
			this.send('report', x, y);
		});

		global.on('report', ({ playerId, x, y, result }) => {
			if (playerId === id) return;
			this.send('validate', x, y, result);
		});

		global.on('gameOver', (playerId) => {
			this.gameWon = playerId === id;
			this.send('gameOver');
		});

		this.init();
	}
}

export namespace LocalPlayer {
	export type States = SvelteStateMachine.State<
		'idle' | 'setup' | 'waiting' | 'attacking' | 'validating' | 'defending' | 'gameOver'
	>;

	export type Events = SvelteStateMachine.Event<
		| 'start'
		| 'ready'
		| 'attack'
		| 'defend'
		| 'gameOver'
		| 'clearPreview'
		| ['select', id: number]
		| ['preview', x: number, y: number]
		| ['place', x: number, y: number]
		| ['shoot', x: number, y: number]
		| ['validate', x: number, y: number, result: Player.Grid.AttackResult]
		| ['report', x: number, y: number]
	>;
}
