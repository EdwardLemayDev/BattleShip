import { dev } from '$app/environment';
import { FiniteStateMachine } from 'runed';

export type GuiStates = 'loading' | 'intro' | 'menu' | 'lobby' | 'game';

export type GuiEvents = 'loaded' | 'done' | `lobby.${'new' | 'quit'}`;

export function initGui() {
	const gui = new FiniteStateMachine<GuiStates, GuiEvents>('loading', {
		loading: {
			loaded: dev
				? () => {
						// if (dev?.skipIntro) {
						// 	return dev.newLobby ? 'game.lobby' : 'menu.home';
						// }
						return 'intro';
					}
				: 'intro'
		},
		intro: {
			done: dev
				? () => {
						// if (dev?.newLobby) {
						// 	return 'lobby';
						// }
						return 'menu';
					}
				: 'menu'
		},
		menu: {
			'lobby.new': 'lobby'
		},
		lobby: {
			'lobby.quit': 'menu'
		},
		game: {}
	});

	return gui;
}
