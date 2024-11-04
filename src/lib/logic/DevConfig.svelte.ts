import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT_KEY = Symbol();

const DEV_KEYS = Object.freeze({
	MENU_OPENED: 'dev_menu_opened',
	SKIP_INTRO: 'skip_intro',
	NEW_LOBBY: 'new_lobby'
} as const);

export class DevConfig {
	static fromContext(): DevConfig | never {
		if (hasContext(CONTEXT_KEY)) return getContext<DevConfig>(CONTEXT_KEY);
		throw new Error('DevConfig was not initialized yet');
	}

	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);
	newLobby: boolean = $state(false);

	constructor() {
		setContext(CONTEXT_KEY, this);

		if (typeof window !== 'undefined') {
			this.menuOpened = getFromLocal(DEV_KEYS.MENU_OPENED, 'false');
			$effect(() => saveToLocal(DEV_KEYS.MENU_OPENED, this.menuOpened));

			this.skipIntro = getFromLocal(DEV_KEYS.SKIP_INTRO, 'false');
			$effect(() => saveToLocal(DEV_KEYS.SKIP_INTRO, this.skipIntro));

			this.newLobby = getFromLocal(DEV_KEYS.NEW_LOBBY, 'false');
			$effect(() => saveToLocal(DEV_KEYS.NEW_LOBBY, this.newLobby));
		}
	}
}

function getFromLocal(key: string, fallback: string) {
	return JSON.parse(localStorage.getItem(key) ?? fallback);
}

function saveToLocal(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}
