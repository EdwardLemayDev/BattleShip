import { dev } from '$app/environment';
import { useContext } from '$lib/class/useContext';
import syncStateToLocal from '$lib/utils/local.svelte';

export const DevSettings =
	dev &&
	useContext(
		class DevSettings {
			menuOpened: boolean = $state(false);
			skipIntro: boolean = $state(false);
			newLobby: boolean = $state(false);

			constructor() {
				syncStateToLocal(this, 'menuOpened', 'skipIntro', 'newLobby');
			}
		}
	);
