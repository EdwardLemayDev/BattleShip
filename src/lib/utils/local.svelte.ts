import { on } from 'svelte/events';

export function syncLocalStorage<DataT>(
	key: string,
	get: () => DataT | undefined,
	set: (data: DataT) => void
) {
	if (typeof localStorage === 'undefined') return;

	const initialLocal = fromJSON<DataT>(getLocal(key));
	if (initialLocal) set(initialLocal);

	$effect(() => {
		const data = get();
		if (data) saveLocal(key, toJSON(data));
	});
	$effect(() =>
		on(window, 'storage', ({ key: eventKey, newValue, storageArea }) => {
			if (eventKey !== key || !newValue || storageArea !== localStorage) return;

			const newLocal = fromJSON<DataT>(newValue);
			if (newLocal) set(newLocal);
		})
	);
}

export function toJSON(data: any) {
	try {
		return JSON.stringify(data);
	} catch {
		return 'null';
	}
}

export function fromJSON<ReturnT>(content: string | null) {
	if (!content) return null;

	try {
		return JSON.parse(content) as ReturnT;
	} catch {
		return null;
	}
}

export function saveLocal(key: string, content: string) {
	try {
		localStorage.setItem(key, content);
	} catch {}
}

export function getLocal(key: string) {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}
