import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';
import { Dev } from '$lib/dev';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

let dev: undefined | InstanceType<Exclude<typeof Dev, false>>;

export const GUI = useStrictContext(
	useStateMachine(
		class GUILogic {
			stage = $state('loading') as GuiState;

			constructor() {
				if (Dev) dev = Dev.fromContext();
			}
		},
		{
			states: ['loading', 'intro', 'menu', 'lobby'] satisfies GuiState[],
			events: {
				loaded: {
					loading() {
						if (Dev && dev?.skipIntro) {
							return dev.newLobby ? 'lobby' : 'menu';
						}
						return 'intro';
					}
				},
				completed: {
					intro() {
						if (Dev && dev?.newLobby) {
							return 'lobby';
						}
						return 'menu';
					}
				},
				// TODO - Finalise removal of old events
				next: {
					menu() {
						return 'lobby';
					}
				}
			},
			update(state) {
				this.stage = state;
			}
		}
	)
);
