import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT_KEY = Symbol();

const DEV_KEYS = Object.freeze({
	SKIP_INTRO: 'skip_intro'
} as const);

export class DevConfig {
	static fromContext(): DevConfig | never {
		if (hasContext(CONTEXT_KEY)) return getContext<DevConfig>(CONTEXT_KEY);
		throw new Error('DevConfig was not initialized yet');
	}

	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);

	constructor() {
		setContext(CONTEXT_KEY, this);

		if (typeof window !== 'undefined') {
			this.skipIntro = JSON.parse(localStorage.getItem(DEV_KEYS.SKIP_INTRO) ?? 'false');
			$effect(() => {
				localStorage.setItem(DEV_KEYS.SKIP_INTRO, JSON.stringify(this.skipIntro));
			});
		}
	}
}
