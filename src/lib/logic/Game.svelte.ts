export class GameStage {
	static readonly LOADING = new GameStage();
	static readonly INTRO = new GameStage();
	static readonly MENU = new GameStage();

	private constructor() {}
}

export class GameLogic {
	stage: GameStage = $state(GameStage.LOADING);

	constructor() {}
}
