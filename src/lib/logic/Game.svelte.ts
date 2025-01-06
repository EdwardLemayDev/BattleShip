import { useContext } from '$lib/utils/context';
import { SvelteStateMachine } from '$lib/utils/SvelteStateMachine.svelte';
import { initGlobal } from './Global';
import { Classic } from './Mode/Classic.svelte';
import type { Mode } from './Mode/Mode';
import { EasyBot } from './Player/EasyBot.svelte';
import { LocalPlayer } from './Player/Local.svelte';
import type { Player } from './Player/Player.svelte';

export const [setGameLogic, useGameLogic] = useContext(
	Symbol('GameLogic Context'),
	() => new GameLogic()
);

export class GameLogic extends SvelteStateMachine<Game.States, Game.Events> {
	readonly global = initGlobal();

	readonly players: Game.Players = $state([null, null]);
	#playersReady: [boolean, boolean] = $state([false, false]);

	#gameMode: Mode | null = $state(null);

	role: Game.Role | null = $state(null);
	get turn() {
		return this.#gameMode?.turn ?? null;
	}

	get mode() {
		return this.#gameMode?.name ?? null;
	}
	set mode(mode) {
		this.setMode(mode);
	}

	constructor() {
		super('idle', {
			idle: {
				_enter: () => {
					this.role = null;

					this.setPlayer(1, null);
					this.setPlayer(2, null);
					this.setMode(null);
				},

				new: () => {
					this.role = 'host';

					this.setPlayer(1, 'Local');
					this.setPlayer(2, 'Easy');
					this.setMode('Classic');

					return 'lobby';
				}
			},

			lobby: {
				start: () => {
					this.global.emit('start');

					return 'setup';
				}
			},

			setup: {
				ready: () => 'playing'
			},

			playing: {
				_enter: () => {
					this.global.emit('firstTurn');
				},

				ready: () => {
					for (let player of this.players) {
						if (player === null || this.#gameMode === null) {
							this.send('reset');
							return;
						} else if (player.lives <= 0) {
							this.global.emit('gameOver', this.#gameMode.turn);
							return 'gameOver';
						}
					}

					this.global.emit('nextTurn');
				}
			},

			gameOver: {},

			'*': {
				reset: () => 'idle'
			}
		});

		this.global.on('ready', (id) => {
			this.#playersReady[id - 1] = true;

			for (let ready of this.#playersReady) {
				if (!ready) return;
			}

			this.#playersReady = [false, false];

			this.send('ready');
		});

		this.init();
	}

	getPlayer(id: Player.Id) {
		return this.players[id - 1];
	}

	setPlayer(id: Player.Id, type: Player.Type | null) {
		const index = id - 1;

		this.global.reset(id);

		const context = this.global.context(id);

		switch (type) {
			case 'Local': {
				this.players[index] = new LocalPlayer(id, context);
				break;
			}

			case 'Easy': {
				this.players[index] = new EasyBot(id, context);
				break;
			}

			default: {
				this.players[index] = null;
			}
		}
	}

	setMode(name: Mode.Name | null) {
		this.global.reset('mode');

		const context = this.global.context('mode');

		switch (name) {
			case 'Classic': {
				this.#gameMode = new Classic(context);
				break;
			}

			default: {
				this.#gameMode = null;
			}
		}
	}
}

export namespace Game {
	export type States = SvelteStateMachine.State<
		'idle' | 'lobby' | 'setup' | 'playing' | 'gameOver'
	>;

	export type Events = SvelteStateMachine.Event<'reset' | 'new' | 'start' | 'ready' | 'restart'>;

	export type Role = 'host' | 'guess';

	export type Players = [Player | null, Player | null];
}
