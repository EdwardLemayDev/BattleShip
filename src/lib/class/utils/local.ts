import { IS_BROWSER, IS_SERVER } from '$lib/const';

export type LocalValues =
	| string
	| number
	| boolean
	| LocalValues[]
	| { [key: string]: LocalValues };

export function safeSetLocal(key: string, value: string) {
	if (IS_BROWSER) localStorage.setItem(key, value);
}

export function safeGetLocal(key: string): string | null {
	if (IS_SERVER) return null;
	else return localStorage.getItem(key);
}

export function safeJSONStringify(value: LocalValues) {
	try {
		return JSON.stringify(value);
	} catch {
		return 'null';
	}
}

export function safeJSONParse<T>(json: string | null) {
	try {
		return JSON.parse(json as string) as T;
	} catch {
		return null;
	}
}

export function saveToLocal<T extends LocalValues>(key: string, value: T) {
	safeSetLocal(key, safeJSONStringify(value));
}

export function syncFromLocal<T extends LocalValues>(key: string) {
	return safeJSONParse<T>(safeGetLocal(key));
}
