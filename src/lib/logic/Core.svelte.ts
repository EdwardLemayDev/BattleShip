import { dev } from '$app/environment';
import type { DevLogic } from '$lib/logic/Dev.svelte';
import { useContext } from '$lib/utils/context';
import type { PrettyReturnType } from '$lib/utils/Prettify';
import { FiniteStateMachine } from 'runed';
import type { GameLogic } from './Game.svelte';

export type CoreStates = 'loading' | 'intro' | 'menu' | 'game';
export type CoreEvents = 'loaded' | 'done' | 'start';

export type CoreLogic = PrettyReturnType<typeof setCoreLogic>;

export const [setCoreLogic, useCoreLogic] = useContext(
	Symbol('Core Context'),
	(devLogic: DevLogic, game: GameLogic) => {
		const STATE = new FiniteStateMachine<CoreStates, CoreEvents>('loading', {
			loading: {
				loaded: dev
					? () => {
							if (devLogic?.skipIntro) {
								return devLogic.autoLobby ? 'game' : 'menu';
							}
							return 'intro';
						}
					: 'intro'
			},
			intro: {
				done: dev ? () => (devLogic?.autoLobby ? 'game' : 'menu') : 'menu'
			},
			menu: {
				start: 'game'
			},
			game: {}
		});

		return {
			get state() {
				return STATE.current;
			},

			loaded: () => {
				STATE.send('loaded');
			},

			introDone: () => {
				STATE.send('done');
			},

			createLobby: () => {
				game.createLobby();
				STATE.send('start');
			}
		};
	}
);
