import { dev } from '$app/environment';
import { useContext } from '$lib/utils/context';
import { syncLocalStorage } from '$lib/utils/local.svelte';
import type { PrettyReturnType } from '$lib/utils/Prettify';
import type { Player } from './Player/Player.svelte';

export type DevLogic = PrettyReturnType<typeof setDevLogic>;

export const [setDevLogic, useDevLogic] = useContext(Symbol(), () => {
	if (dev) {
		return new _DevLogic();
	}
});

class _DevLogic {
	menuOpened: boolean = $state(false);
	skipIntro: boolean = $state(false);
	autoLobby: boolean = $state(false);
	playerView: Player.Id = $state(1);

	constructor() {
		syncLocalStorage(
			'battleship:dev-menu',
			() => ({
				menu_opened: this.menuOpened,
				skip_intro: this.skipIntro,
				auto_lobby: this.autoLobby,
				player_view: this.playerView
			}),
			({ menu_opened, skip_intro, auto_lobby, player_view }) => {
				this.menuOpened = menu_opened;
				this.skipIntro = skip_intro;
				this.autoLobby = auto_lobby;
				this.playerView = player_view;
			}
		);
	}
}
