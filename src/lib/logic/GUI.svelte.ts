import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';
import { Dev } from '$lib/dev';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

let dev: undefined | InstanceType<Exclude<typeof Dev, false>>;

export const GUI = useStrictContext(
	useStateMachine(
		class GUILogic {
			current = $state('loading') as GuiState;

			constructor() {
				if (Dev) dev = Dev.fromContext();
			}
		},
		{
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
						if (Dev && dev?.newLobby) {
							return 'lobby';
						}
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
		}
	)
);
