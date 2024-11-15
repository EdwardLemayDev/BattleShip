import { useStrictContext } from '$lib/class/useContext';

export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export type EnnemyMode = 'PVE1' | 'PVE2' | 'PVE3' | 'PVP';

const ennemyNames: Record<EnnemyMode, string> = {
	PVE1: 'BOT - Easy',
	PVE2: 'BOT - Medium',
	PVE3: 'BOT - Hard',
	PVP: 'Player'
};

export const Game = useStrictContext(
	class GameLogic {
		gameMode: GameMode = $state('Classic');
		ennemyMode: EnnemyMode = $state('PVE1');

		ennemyName: string = $derived(ennemyNames[this.ennemyMode]);

		resetLobby() {
			this.gameMode = 'Classic';
			this.ennemyMode = 'PVE1';
		}
	}
);
