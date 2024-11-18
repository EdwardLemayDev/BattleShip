import type { Agent } from './Agent';

export type EnnemyMode = 'easy' | 'medium' | 'hard' | 'pvp';

export class Ennemy implements Agent {
	name: string = $state('');

	#mode: EnnemyMode = 'easy';

	constructor() {
		this.reset();
	}

	reset() {
		this.setMode('easy');
	}

	setMode(mode: EnnemyMode) {
		this.#mode = mode;

		switch (mode) {
			case 'easy': {
				this.name = 'BOT - Easy';
				break;
			}
			case 'medium': {
				this.name = 'BOT - Medium';
				break;
			}
			case 'hard': {
				this.name = 'BOT - Hard';
				break;
			}
			case 'pvp': {
				this.name = '';
				break;
			}
		}
	}
}
