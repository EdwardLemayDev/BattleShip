import { useLocalStorage } from '$lib/utils/useLocalStorage.svelte';

export class DevOptions {
	menuOpened = $state(false);
	skipIntro = $state(false);
	autoLobby = $state(false);

	constructor() {
		useLocalStorage(
			'battleship:dev_menu',
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
