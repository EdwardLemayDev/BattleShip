import { dev } from '$app/environment';
import { getContext, setContext } from 'svelte';

const DEV_CONFIG_KEY = Symbol();

const DEV_KEYS = Object.freeze({
	SKIP_INTRO: 'skip_intro'
});

export function initDevConfig() {
	if (dev) {
		return setContext(DEV_CONFIG_KEY, new DevConfig());
	} else {
		return undefined;
	}
}

export function useDevConfig() {
	if (dev) {
		return getContext(DEV_CONFIG_KEY) as DevConfig;
	} else {
		return undefined;
	}
}

class DevConfig {
	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.skipIntro = JSON.parse(localStorage.getItem(DEV_KEYS.SKIP_INTRO) ?? 'false');
			$effect(() => {
				localStorage.setItem(DEV_KEYS.SKIP_INTRO, JSON.stringify(this.skipIntro));
			});
		}
	}
}
