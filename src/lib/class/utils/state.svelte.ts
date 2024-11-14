import { IS_BROWSER } from '$lib/const';
import { on } from 'svelte/events';
import { STATE_SYMBOL } from '../useState';
import { safeJSONParse, saveToLocal, syncFromLocal, type LocalValues } from './local';

export const State = <T>(value: T) => {
	let state = $state(value);

	return {
		[STATE_SYMBOL]: true,
		get: () => state,
		set: (val: T) => (state = val)
	} as T;
};

export const Derived = <T>(fn: () => T) => {
	let state = $derived.by(fn);

	return {
		[STATE_SYMBOL]: true,
		get: () => state
	} as T;
};

export const LocalState = <T extends LocalValues>(key: string, value: T) => {
	if (IS_BROWSER) value = syncFromLocal<T>(key) ?? value;

	let state: LocalValues = $state(value);

	if (IS_BROWSER) {
		$effect(() => saveToLocal(key, state));
		$effect(() =>
			on(window, 'storage', ({ key: storageKey, storageArea, newValue }) => {
				if (storageKey !== key || storageArea !== localStorage) return;
				state = safeJSONParse(newValue) ?? state;
			})
		);
	}

	return {
		[STATE_SYMBOL]: true,
		get: () => state,
		set: (val: T) => (state = val)
	} as unknown as T;
};
