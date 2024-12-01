import type { PageProps } from '$lib/layout/Menu/Page.svelte';
import { FiniteStateMachine } from 'runed';

export type MenuStates = 'home' | 'join' | 'settings' | 'about';
export type MenuEvents = 'open' | 'back';

export type MenuMeta = {
	title: string;
	size?: PageProps['titleSize'];
};

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

		readonly meta: MenuMeta = $derived.by(() => {
			switch (STATE.current) {
				case 'home':
					return { title: 'Battleship', size: 'lg' };
				case 'join':
					return { title: 'Join Game' };
				case 'settings':
					return { title: 'Settings' };
				case 'about':
					return { title: 'About' };
			}
		});

		open(option: MenuOptions) {
			STATE.send('open', option);
		}
		back() {
			STATE.send('back');
		}
	}

	return new Menu();
}
