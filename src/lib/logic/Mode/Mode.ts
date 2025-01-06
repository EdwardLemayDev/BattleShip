import type { Global } from '../Global';
import type { Player } from '../Player/Player.svelte';

export interface Mode {
	readonly name: Mode.Name;

	turn: Player.Id;
}

export namespace Mode {
	export type Name = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

	export type Builder = new (global: Global.Context) => Mode;
}

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
