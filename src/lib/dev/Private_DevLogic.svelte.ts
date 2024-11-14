import { useStrictContext } from '$lib/class/useContext';
import { useState } from '$lib/class/useState';
import { LocalState } from '$lib/class/utils/state.svelte';

const ST = (name: string) => `@DEV - ${name}`;

export const DevLogic = useStrictContext(
	useState(
		class DevCore {
			menuOpened: boolean = LocalState(ST('Menu Opened'), false);
			skipIntro: boolean = LocalState(ST('Skip Intro'), false);
			newLobby: boolean = LocalState(ST('New Lobby'), false);
		}
	)
);
