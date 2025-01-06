import { getRandomInt } from '$lib/logic/Player/Bot/bot';
import type { GameLogic } from './Game.svelte';
import type { PlayerID } from './Player.svelte';

export type GameModes = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export type HistoryString = `${PlayerID}:${number}:${number}:${boolean}`;

export interface GameMode {
	readonly history: HistoryString[];

	start(): PlayerID;
	result(player: PlayerID, x: number, y: number, hit: boolean): void;
	nextTurn(player: PlayerID): PlayerID;
	reset(): void;
}

export class ClassicMode implements GameMode {
	readonly history: HistoryString[] = $state([]);

	start(): PlayerID {
		return getRandomInt(1, 2) as PlayerID;
	}

	result(player: PlayerID, x: number, y: number, hit: boolean): void {
		this.history.push(`${player}:${x}:${y}:${hit}`);
	}

	nextTurn(player: PlayerID): PlayerID {
		return player === 1 ? 2 : 1;
	}

	reset(): void {
		this.history.length = 0;
	}
}

export class SalvoMode implements GameMode {
	#game: GameLogic;

	#shots: {
		1: number;
		2: number;
	};

	readonly history: HistoryString[] = $state([]);

	constructor(game: GameLogic) {
		this.#game = game;

		this.#shots = { 1: 0, 2: 0 };
	}

	start(): PlayerID {
		const player = getRandomInt(1, 2) as PlayerID;

		this.#shots[player] = 5;
		return player;
	}

	result(player: PlayerID, x: number, y: number, hit: boolean): void {
		this.history.push(`${player}:${x}:${y}:${hit}`);
	}

	nextTurn(player: PlayerID): PlayerID {
		if (--this.#shots[player]) return player;

		const defender = player === 1 ? 2 : 1;

		this.#shots[defender] = 5; // TOTO - Get alive ships
		return defender;
	}

	reset(): void {
		this.history.length = 0;
	}
}

export class BonusMode implements GameMode {
	#lastShotHit = false;

	readonly history: HistoryString[] = $state([]);

	start(): PlayerID {
		return getRandomInt(1, 2) as PlayerID;
	}

	result(player: PlayerID, x: number, y: number, hit: boolean): void {
		this.history.push(`${player}:${x}:${y}:${hit}`);
		this.#lastShotHit = hit;
	}

	nextTurn(player: PlayerID): PlayerID {
		return this.#lastShotHit ? player : player === 1 ? 2 : 1;
	}

	reset(): void {
		this.history.length = 0;
	}
}
