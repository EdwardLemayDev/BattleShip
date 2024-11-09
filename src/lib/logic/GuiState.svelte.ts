import strictContext from '$lib/utils/context';
import createFsm from '$lib/utils/fsm';
import { useDevSettings } from './DevSettings.svelte';

const Context = strictContext<GuiStateLogic>();

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

class GuiStateLogic {
	#current = $state('loading') as GuiState;
	#set;

	constructor() {
		const DevSettings = useDevSettings();

		this.#set = createFsm<GuiState, 'next' | 'skip'>({
			initial: 'loading',
			states: {
				loading: {
					next: () => 'intro',
					skip: () => {
						if (DevSettings?.newLobby) return 'lobby';
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

export function initGuiState() {
	return Context.set(new GuiStateLogic());
}

export function useGuiState() {
	return Context.get();
}
