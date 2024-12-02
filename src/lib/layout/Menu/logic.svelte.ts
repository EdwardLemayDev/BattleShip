import { FiniteStateMachine } from 'runed';

export type MenuStates = 'home' | 'join' | 'settings' | 'about';
export type MenuEvents = 'open' | 'back';

export type MenuOptions = Exclude<MenuStates, 'home'>;

export function initMenu() {
	const back: MenuStates = 'home';

	const STATE = new FiniteStateMachine<MenuStates, MenuEvents>('home', {
		home: {
			open: (option) => option as MenuOptions
		},
		join: { back },
		settings: { back },
		about: { back }
	});

	class Menu {
		get page() {
			return STATE.current;
		}

		open(option: MenuOptions) {
			STATE.send('open', option);
		}
		back() {
			STATE.send('back');
		}
	}

	return new Menu();
}
