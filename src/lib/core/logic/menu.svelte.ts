import { type ApiType, type CoreAction, type CoreTransition, type ModuleContext } from './module';

export type MenuStates = `menu_${MenuSubStates}`;
export type MenuSubStates = 'home' | 'join' | 'settings' | 'about';

export type MenuEvents = `menu_${'goto' | 'back'}`;

export type MenuTransitions = CoreTransition<MenuStates, MenuEvents>;
export type MenuApi = ApiType<typeof initMenuModule>;

export type MenuOptions = Exclude<MenuSubStates, 'home'> | 'lobby';

export function initMenuModule({ send }: ModuleContext) {
	const menu_back: CoreAction = 'menu_home';

	const transitions: MenuTransitions = {
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

	const api = class MenuApi {
		goto(option: MenuOptions) {
			send('menu_goto', option);
		}
		back() {
			send('menu_back');
		}
	};

	return [transitions, api] as const;
}
