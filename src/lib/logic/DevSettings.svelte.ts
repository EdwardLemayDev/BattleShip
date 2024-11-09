import { dev } from '$app/environment';
import { UseContext } from '$lib/utils/class/hook/UseContext';
import syncStateToLocal from '$lib/utils/local.svelte';

export const DevSettings =
	dev &&
	UseContext(
		class DevSettings {
			menuOpened: boolean = $state(false);
			skipIntro: boolean = $state(false);
			newLobby: boolean = $state(false);

			constructor() {
				syncStateToLocal(this, 'menuOpened', 'skipIntro', 'newLobby');
			}
		}
	);
