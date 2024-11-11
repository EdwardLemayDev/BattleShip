import { dev } from '$app/environment';
import { useStrictContext } from '$lib/class/useContext';
import { LocalState, useState } from '$lib/class/useState.svelte';

const ST = (name: string) => `@DEV - ${name}`;

export const DevSettings =
	dev &&
	useStrictContext(
		useState(
			class DevSettings {
				menuOpened: boolean = LocalState(ST('Menu Opened'), false);
				skipIntro: boolean = LocalState(ST('Skip Intro'), false);
				newLobby: boolean = LocalState(ST('New Lobby'), false);
			}
		)
	);
