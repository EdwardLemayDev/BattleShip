import { newTransitionModule, type ModuleContext } from './module';

export type LobbyStates = `lobby_${LobbySubStates}`;
export type LobbySubStates = 'home';

export type LobbyEvents = `lobby_${'goto'}`;

export const initLobbyTransitions = newTransitionModule<LobbyStates, LobbyEvents>(() => {
	return {
		lobby_home: {}
	};
});

export class LobbyApi {
	constructor({}: ModuleContext) {}
}
