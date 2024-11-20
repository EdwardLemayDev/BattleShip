import { FiniteStateMachine } from 'runed';

export type MenuStates = 'home' | 'join' | 'settings' | 'about';

export type MenuEvents = `open.${'join' | 'settings' | 'about'}` | 'back';

class Menu extends FiniteStateMachine<MenuStates, MenuEvents> {
	readonly title = $derived.by(() => {
		switch (this.current) {
			case 'home':
				return 'Battleship';
			case 'join':
				return 'Join Game';
			case 'settings':
				return 'Settings';
			case 'about':
				return 'About';
		}
	});

	readonly size = $derived.by(() => {
		switch (this.current) {
			case 'home':
				return 'lg';
			case 'join':
			case 'settings':
			case 'about':
				return 'md';
		}
	});

	constructor() {
		super('home', {
			home: {
				'open.join': 'join',
				'open.settings': 'settings',
				'open.about': 'about'
			},
			join: { back: 'home' },
			settings: { back: 'home' },
			about: { back: 'home' }
		});
	}
}

export function initMenu() {
	return new Menu();
}
