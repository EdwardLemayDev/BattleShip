import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';
import { DevSettings } from './DevSettings.svelte';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

class GuiStateCore {
	current = $state('loading') as GuiState;
	dev = DevSettings && DevSettings.fromContext();
}

export const GuiStateLogic = useStrictContext(
	useStateMachine(GuiStateCore, {
		states: ['loading', 'intro', 'menu', 'lobby'] satisfies GuiState[],
		events: {
			next: {
				loading() {
					return 'intro';
				},
				intro() {
					return 'menu';
				},
				menu() {
					return 'lobby';
				},
				lobby() {
					return 'lobby';
				}
			},
			skip: {
				loading() {
					if (this.dev && this.dev.newLobby) return 'lobby';
					return 'menu';
				},
				intro() {
					return 'lobby';
				}
			}
		},
		update(state) {
			this.current = state;
		}
	})
);
