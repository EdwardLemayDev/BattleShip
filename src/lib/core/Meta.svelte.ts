export type GameMode = 'Classic' | 'Salvo' | 'Bonus' | 'Special';

export class CoreMeta {
	gameMode: GameMode = $state('Classic');

	allyName: string = $state('ALLY_NAME');
	ennemyName: string = $state('ENNEMY_NAME');
}
