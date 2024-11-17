import { useStrictContext } from '$lib/class/useContext';
import { useStateMachine } from '$lib/class/useStateMachine';

export type PopUpStages = 'closed' | 'PvE' | 'PvP';

function close() {
	return 'closed' as const;
}

export const PopUpStage = useStrictContext(
	useStateMachine(
		class PopUpCore {
			stage: PopUpStages = $state('closed');
		},
		{
			states: ['closed', 'PvE', 'PvP'] satisfies PopUpStages[],
			events: {
				openPvE: {
					closed() {
						return 'PvE';
					}
				},
				openPvP: {
					closed() {
						return 'PvP';
					}
				},
				close: {
					PvE: close,
					PvP: close
				}
			},
			update(state) {
				this.stage = state;
			}
		}
	)
);
