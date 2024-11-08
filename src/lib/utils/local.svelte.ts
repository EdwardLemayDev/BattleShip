import { on } from 'svelte/events';

const KEY_SEPARATOR = '.';

export default function syncStateToLocal<Obj extends Object, Keys extends keyof Obj>(
	obj: Obj,
	...keys: Keys[]
) {
	if (typeof localStorage === 'undefined') return;
	for (const key of keys) {
		if (typeof key !== 'string') throw new Error('Synced value key must be a string');

		const storageKey = `${obj.constructor.name}${KEY_SEPARATOR}${key}`;

		obj[key] = getLocal(storageKey, obj[key]);
		$effect(() => saveLocal(storageKey, obj[key]));
	}
	$effect(() =>
		on(window, 'storage', ({ key, newValue, storageArea }) => {
			if (key === null || newValue === null || storageArea !== localStorage) return;

			const objKey = key.split(KEY_SEPARATOR)[1] as Keys;

			try {
				obj[objKey] = JSON.parse(newValue);
			} catch (e) {
				console.warn(e);
			}
		})
	);
}

function getLocal<T>(key: string, fallback: T): T {
	return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
}

function saveLocal(key: string, content: any) {
	localStorage.setItem(key, JSON.stringify(content));
}
