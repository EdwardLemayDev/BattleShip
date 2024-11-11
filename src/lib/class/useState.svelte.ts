import { on } from 'svelte/events';
import type { ClassConstructor } from './GenericConstructor';
import { getFromLocal, safeJSONParse, saveToLocal, type LocalValues } from './utils/local';
import { silentConstructor } from './utils/silentConstructor';

const SIGNAL_KEY = Symbol('Custom Signal');

export const State = <T>(value: T) => {
	let signal = $state(value);

	return {
		[SIGNAL_KEY]: true,
		get: () => signal,
		set: (val: T) => (signal = val)
	} as T;
};

export const LocalState = <T extends LocalValues>(key: string, value: T) => {
	let signal: LocalValues = $state(getFromLocal(key) ?? value);

	if (typeof window !== 'undefined') {
		$effect(() => saveToLocal(key, signal));
		$effect(() =>
			on(window, 'storage', ({ key: storageKey, storageArea, newValue }) => {
				if (!newValue || storageArea !== localStorage || storageKey !== key) return;
				signal = safeJSONParse(newValue);
			})
		);
	}

	return {
		[SIGNAL_KEY]: true,
		get: () => signal,
		set: (val: T) => (signal = val)
	} as unknown as T;
};

export function useState<Constructor extends ClassConstructor>(Base: Constructor) {
	type Instance = InstanceType<Constructor>;

	const SignalConstructor = silentConstructor(Base, function (...args) {
		return transformSignals(new Base(...args) as Instance);
	});

	return SignalConstructor;
}

function transformSignals<T>(original: T) {
	for (const propName of Object.getOwnPropertyNames(original)) {
		const propValue = (original as any)[propName];

		if (propValue?.[SIGNAL_KEY]) {
			Object.defineProperty(original, propName, propValue);
		}
	}

	const parent = Object.getPrototypeOf(original);
	if (parent) transformSignals(parent);

	return original;
}
