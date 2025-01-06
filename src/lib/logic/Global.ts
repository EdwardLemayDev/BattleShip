import mitt, { type Emitter } from 'mitt';
import type { Player } from './Player/Player.svelte';

export function initGlobal() {
	const global: Global = mitt();
	const handlers: Record<Global.Key, Parameters<Global['on']>[]> = {
		1: [],
		2: [],
		mode: []
	};

	return Object.assign(global, {
		context: (id: Global.Key) => {
			return {
				on: (...args: Parameters<Global['on']>) => {
					global.on(...args);
					handlers[id].push(args);
				},

				emit(...args: Parameters<Global['emit']>) {
					setTimeout(() => global.emit(...args));
				}
			} as Global.Context;
		},

		reset: (id: Global.Key) => {
			handlers[id].forEach((args) => global.off(...args));
			handlers[id] = [];
		}
	});
}

export type Global = Emitter<Global.Events>;

export namespace Global {
	export type Context = Omit<Global, 'off' | 'all'>;

	export type Key = Player.Id | 'mode';

	export type Events = {
		start: void;
		ready: Player.Id;
		play: Player.Id;
		shoot: {
			playerId: Player.Id;
			x: number;
			y: number;
		};
		report: {
			playerId: Player.Id;
			x: number;
			y: number;
			result: Player.Grid.AttackResult;
		};

		firstTurn: void;
		nextTurn: void;
		gameOver: Player.Id;
	};
}
