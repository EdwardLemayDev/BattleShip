import { useContext } from '$lib/utils/context';
import type { PrettyReturnType } from '$lib/utils/Prettify';
import { FiniteStateMachine } from 'runed';

export type GameStates = 'idle' | 'lobby';
export type GameEvents = 'start';

export type GameLogic = PrettyReturnType<typeof setGameLogic>;

export type GameModes = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export const [setGameLogic, useGameLogic] = useContext(Symbol('GameLogic Context'), () => {
	const STATE = new FiniteStateMachine<GameStates, GameEvents>('idle', {
		idle: {
			start: 'lobby'
		},
		lobby: {}
	});

	class GameLogic {
		get state() {
			return STATE.current;
		}

		mode: GameModes = $state('Classic');

		createLobby() {
			STATE.send('start');
		}
	}

	return new GameLogic();
});
