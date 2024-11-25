import { newTransitionModule, type ModuleContext } from './module';

export type MenuStates = `menu_${MenuSubStates}`;
export type MenuSubStates = 'home' | 'join' | 'settings' | 'about';

export type MenuEvents = `menu_${'goto' | 'back'}`;

export type MenuOptions = Exclude<MenuSubStates, 'home'> | 'lobby';

export const initMenuTransitions = newTransitionModule<MenuStates, MenuEvents>(() => {
	const menu_back = 'menu_home';

	return {
		menu_home: {
			menu_goto: (_option) => {
				const option = _option as MenuOptions;

				switch (option) {
					case 'join':
					case 'settings':
					case 'about':
						return `menu_${option}`;
					case 'lobby':
						return 'lobby_home';
					default:
						return;
				}
			}
		},
		menu_join: { menu_back },
		menu_settings: { menu_back },
		menu_about: { menu_back }
	};
});

export class MenuApi {
	#send: ModuleContext['send'];

	constructor({ send }: ModuleContext) {
		this.#send = send;
	}

	goto(option: MenuOptions) {
		this.#send('menu_goto', option);
	}
	back() {
		this.#send('menu_back');
	}
}
