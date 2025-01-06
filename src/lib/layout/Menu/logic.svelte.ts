import type { PrettyReturnType } from '$lib/utils/Prettify';
import { FiniteStateMachine } from 'runed';

export type MenuStates = 'home' | 'join' | 'settings' | 'about';
export type MenuEvents = 'open' | 'back';

export type MenuLogic = PrettyReturnType<typeof setMenuLogic>;

export type MenuOptions = Exclude<MenuStates, 'home'>;

export function setMenuLogic() {
	const back: MenuStates = 'home';

	const STATE = new FiniteStateMachine<MenuStates, MenuEvents>('home', {
		home: {
			open: (option) => option as MenuOptions
		},
		join: { back },
		settings: { back },
		about: { back }
	});

	return {
		get page() {
			return STATE.current;
		},

		open: (option: MenuOptions) => {
			STATE.send('open', option);
		},
		back: () => {
			STATE.send('back');
		}
	};
}
