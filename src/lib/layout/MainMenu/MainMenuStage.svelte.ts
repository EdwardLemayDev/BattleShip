import { useStateMachine } from '$lib/class/useStateMachine';
import type { MenuPageProps } from '$lib/components/MenuPage.svelte';

export type MainMenuStages = 'home' | 'join' | 'settings' | 'about';

function back() {
	return 'home' as const;
}

export const MainMenuStage = useStateMachine(
	class MainMenuCore {
		stage: MainMenuStages = $state('home');

		title: string = '';
		size: MenuPageProps['titleSize'] | undefined;
	},
	{
		states: ['home', 'join', 'settings', 'about'] satisfies MainMenuStages[],
		events: {
			join: {
				home() {
					return 'join';
				}
			},
			settings: {
				home() {
					return 'settings';
				}
			},
			about: {
				home() {
					return 'about';
				}
			},
			back: {
				join: back,
				settings: back,
				about: back
			}
		},
		update(state) {
			this.stage = state;

			switch (state) {
				case 'home': {
					this.title = 'Battleship';
					this.size = 'lg';

					break;
				}
				case 'join': {
					this.title = 'Join Game';
					this.size = 'md';

					break;
				}
				case 'settings': {
					this.title = 'Settings';
					this.size = 'md';

					break;
				}
				case 'about': {
					this.title = 'About';
					this.size = 'md';

					break;
				}
			}
		}
	}
);
