import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';
import { DevSettings } from './DevSettings.svelte';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

class GuiStateCore {
	current = $state('loading') as GuiState;
	dev = DevSettings && DevSettings.fromContext();
}

export const GuiStateLogic = useStrictContext(
	useStateMachine<typeof GuiStateCore, GuiState, 'next' | 'skip'>(GuiStateCore, {
		states: ['loading', 'intro', 'menu', 'lobby'],
		events: {
			next: {
				loading: 'intro',
				intro: 'menu',
				menu: 'lobby',
				lobby: 'lobby'
			},
			skip: {
				loading() {
					if (this.dev && this.dev.newLobby) return 'lobby';
					return 'menu';
				},
				intro: 'lobby'
			}
		},
		update(state) {
			this.current = state;
		}
	})
);
