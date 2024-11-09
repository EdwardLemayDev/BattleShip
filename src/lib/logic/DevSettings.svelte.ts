import { dev } from '$app/environment';
import strictContext from '$lib/utils/context';
import syncStateToLocal from '$lib/utils/local.svelte';

const Context = strictContext<DevSettings>();

class DevSettings {
	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);
	newLobby: boolean = $state(false);

	constructor() {
		syncStateToLocal(this, 'menuOpened', 'skipIntro', 'newLobby');
	}
}

export function initDevSettings() {
	if (dev) return Context.set(new DevSettings());
}

export function useDevSettings() {
	if (dev) return Context.get();
}
