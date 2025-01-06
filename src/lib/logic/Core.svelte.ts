import { dev } from '$app/environment';
import type { DevLogic } from '$lib/logic/Dev.svelte';
import { useContext } from '$lib/utils/context';
import type { PrettyReturnType } from '$lib/utils/Prettify';
import { FiniteStateMachine, type ActionFn } from 'runed';
import type { GameLogic } from './Game.svelte';

export type CoreStates = 'loading' | 'intro' | 'menu' | 'game';
export type CoreEvents = 'loaded' | 'done' | `lobby_${'new'}` | 'quit';
export type CoreAction = ActionFn<CoreStates>;

export type CoreLogic = PrettyReturnType<typeof setCoreLogic>;

export const [setCoreLogic, useCoreLogic] = useContext(
	Symbol(),
	(devLogic: DevLogic, game: GameLogic) => {
		const dev_loaded: CoreAction = () => {
			if (devLogic?.skipIntro) {
				return dev_done();
			}
			return 'intro';
		};

		const dev_done: CoreAction = () => {
			return devLogic?.autoLobby ? lobby_new() : 'menu';
		};

		const lobby_new: CoreAction = () => {
			game.send('new');
			return 'game';
		};

		const STATE = new FiniteStateMachine<CoreStates, CoreEvents>('loading', {
			loading: { loaded: dev ? dev_loaded : 'intro' },
			intro: { done: dev ? dev_done : 'menu' },
			menu: { lobby_new },
			game: {
				quit: () => {
					game.send('reset');
					return 'menu';
				}
			}
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

			quitGame: () => {
				STATE.send('quit');
			},

			createLobby: () => {
				STATE.send('lobby_new');
			}
		};
	}
);
