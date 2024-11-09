import { UseContext } from '$lib/utils/class/hook/UseContext';
import createFsm from '$lib/utils/fsm';
import { DevSettings } from './DevSettings.svelte';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

export const GuiStateLogic = UseContext(
	class GuiStateLogic {
		#current = $state('loading') as GuiState;
		#set;

		constructor() {
			const devSettings = DevSettings && DevSettings.fromContext();

			this.#set = createFsm<GuiState, 'next' | 'skip'>({
				initial: 'loading',
				states: {
					loading: {
						next: () => 'intro',
						skip: () => {
							if (devSettings && devSettings.newLobby) return 'lobby';
							return 'menu';
						}
					},
					intro: { next: () => 'menu', skip: () => 'lobby' },
					menu: { next: () => 'lobby' },
					lobby: { next: () => 'lobby' }
				},
				update: (state) => {
					this.#current = state;
				}
			});
		}

		get current() {
			return this.#current;
		}

		get call() {
			return this.#set;
		}
	}
);
