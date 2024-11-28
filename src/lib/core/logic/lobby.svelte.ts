import { type ApiType, type CoreTransition, type ModuleContext } from './module';

export type LobbyStates = `lobby_${LobbySubStates}`;
export type LobbySubStates = 'home' | 'pve' | 'pvp';

export type LobbyEvents = `lobby_${'popUp' | 'back' | 'quit'}`;

export type LobbyTransitions = CoreTransition<LobbyStates, LobbyEvents>;
export type LobbyApi = ApiType<typeof initLobbyModule>;

export type LobbyPopUp = Exclude<LobbySubStates, 'home'>;

export function initLobbyModule({ send }: ModuleContext) {
	const lobby_back = 'lobby_home';

	const transitions: LobbyTransitions = {
		lobby_home: {
			lobby_popUp: (option) => {
				switch (option as LobbyPopUp) {
					case 'pve':
						return 'lobby_pve';
					case 'pvp':
						return 'lobby_pvp';
				}
			},
			lobby_quit: 'menu_home'
		},
		lobby_pve: { lobby_back },
		lobby_pvp: { lobby_back }
	};

	const api = class LobbyApi {
		popUp(option: LobbyPopUp) {
			send('lobby_popUp', option);
		}
		back() {
			send('lobby_back');
		}
		quit() {
			send('lobby_quit');
		}
	};

	return [transitions, api] as const;
}
