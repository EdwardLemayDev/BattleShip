import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';
import { Dev } from '$lib/dev';
import { Game } from './Game.svelte';

export type GuiState = 'loading' | 'intro' | 'menu' | 'lobby';

let dev: undefined | InstanceType<Exclude<typeof Dev, false>>;

export const GUI = useStrictContext(
	useStateMachine(
		class GUILogic {
			stage = $state('loading') as GuiState;
			game = Game.fromContext();

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
							this.game.resetLobby();
							return 'lobby';
						}
						return 'menu';
					}
				},
				new_game: {
					menu() {
						this.game.resetLobby();
						return 'lobby';
					}
				},
				quit: {
					lobby() {
						return 'menu';
					}
				}
			},
			update(state) {
				this.stage = state;
			}
		}
	)
);
