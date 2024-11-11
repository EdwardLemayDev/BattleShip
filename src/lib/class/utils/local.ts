export type LocalValues =
	| string
	| number
	| boolean
	| LocalValues[]
	| { [key: string]: LocalValues };

export function getFromLocal(key: string): LocalValues | null {
	if (typeof localStorage === 'undefined') return null;

	return safeJSONParse(localStorage.getItem(key));
}

export function saveToLocal(key: string, value: LocalValues) {
	if (typeof localStorage === 'undefined') return;

	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		localStorage.removeItem(key);
	}
}

export function safeJSONParse(json: any) {
	try {
		return JSON.parse(json);
	} catch {
		return json;
	}
}
