import strictContext from '$lib/utils/context';
import syncStateToLocal from '$lib/utils/local.svelte';

const CONTEXT = strictContext<DevSettings>();

class DevSettings {
	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);
	newLobby: boolean = $state(false);

	constructor() {
		syncStateToLocal(this, 'menuOpened', 'skipIntro', 'newLobby');
	}
}

export function initDevSettings() {
	return CONTEXT.set(new DevSettings());
}

export function useDevSettings() {
	return CONTEXT.get();
}
