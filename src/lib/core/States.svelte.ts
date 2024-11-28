import type { CoreStates } from './Core.svelte';

export type CoreStatesArray = Split<CoreStates, '_'>;

export type ToStatesObject<StatesArray extends [string] | [string, string]> = StatesArray extends [
	...infer States
]
	? {
			readonly main: States[0];
			readonly sub: States[1];
		}
	: never;

export type CoreStatesObject = ReturnType<typeof initStates>;

export function initStates(current: () => CoreStates) {
	const [main, sub] = $derived(current().split('_') as CoreStatesArray);

	return {
		get main() {
			return main;
		},
		get sub() {
			return sub;
		}
	} as ToStatesObject<CoreStatesArray>;
}
