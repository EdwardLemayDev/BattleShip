import { browser } from '$app/environment';
import { on } from 'svelte/events';

export function useLocalStorage<ValueT>(key: string, get: () => ValueT, set: (v: ValueT) => void) {
	const initLocal = getFromLocal<ValueT>(key);
	if (initLocal) set(initLocal);

	$effect(() => {
		setToLocal(key, get());
	});
	$effect(() =>
		on(window, 'storage', ({ newValue, key: eventKey, storageArea }) => {
			if (!newValue || eventKey !== key || storageArea !== localStorage) return;

			const newLocal = parseJSON<ValueT>(newValue);
			if (newLocal) set(newLocal);
		})
	);
}

function getFromLocal<ValueT>(key: string) {
	if (browser) {
		return parseJSON<ValueT>(localStorage.getItem(key) ?? 'null');
	}
	return null;
}

function setToLocal(key: string, value: any) {
	if (browser) {
		if (value === null) {
			localStorage.removeItem(key);
			return;
		}
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	}
}

function parseJSON<ValueT>(content: string) {
	try {
		return JSON.parse(content) as ValueT;
	} catch {
		return null;
	}
}
