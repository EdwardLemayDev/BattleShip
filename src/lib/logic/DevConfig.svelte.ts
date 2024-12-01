import { dev } from '$app/environment';
import { useContext } from '$lib/utils/context';
import { syncLocalStorage } from '$lib/utils/local.svelte';

export type DevConfig = ReturnType<typeof initDevConfig>;

export const [initDevConfig, useDevConfig] = useContext(Symbol('DevConfig Context'), () => {
	if (dev) {
		class DevConfig {
			menuOpened: boolean = $state(false);
			skipIntro: boolean = $state(false);
			autoLobby: boolean = $state(false);

			constructor() {
				syncLocalStorage(
					'battleship:dev-menu',
					() => ({
						menu_opened: this.menuOpened,
						skip_intro: this.skipIntro,
						auto_lobby: this.autoLobby
					}),
					({ menu_opened, skip_intro, auto_lobby }) => {
						this.menuOpened = menu_opened;
						this.skipIntro = skip_intro;
						this.autoLobby = auto_lobby;
					}
				);
			}
		}

		return new DevConfig();
	}
});
