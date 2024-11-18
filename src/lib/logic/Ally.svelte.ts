import type { Agent } from './Agent';

export class Ally implements Agent {
	name: string = $state('');

	constructor() {}

	reset() {
		this.name = '';
	}
}
