import { dev } from '$app/environment';
import type { DevConfig } from '$lib/logic/DevConfig.svelte';
import { useContext } from '$lib/utils/context';
import { FiniteStateMachine } from 'runed';

export type GuiStates = 'loading' | 'intro' | 'menu' | 'lobby';
export type GuiEvents = 'loaded' | 'done' | 'new_lobby';

export type GUI = ReturnType<typeof initGUI>;

export const [initGUI, useGUI] = useContext(Symbol('GUI Context'), (devConfig: DevConfig) => {
	const STATE = new FiniteStateMachine<GuiStates, GuiEvents>('loading', {
		loading: {
			loaded: dev
				? () => {
						if (devConfig?.skipIntro) {
							return devConfig.autoLobby ? 'lobby' : 'menu';
						}
						return 'intro';
					}
				: 'intro'
		},
		intro: {
			done: dev ? () => (devConfig?.autoLobby ? 'lobby' : 'menu') : 'menu'
		},
		menu: {
			new_lobby: 'lobby'
		},
		lobby: {}
	});

	class GUI {
		get state() {
			return STATE.current;
		}

		loaded() {
			STATE.send('loaded');
		}
		done() {
			STATE.send('done');
		}
		newLobby() {
			STATE.send('new_lobby');
		}
	}

	return new GUI();
});
