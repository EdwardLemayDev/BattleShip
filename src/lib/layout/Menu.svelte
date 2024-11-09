<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import MenuPage, { type MenuPageProps } from '$lib/components/MenuPage.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { useGameLogic } from '$lib/logic/Game.svelte';

	export type MenuPageData = {
		title: string;
		size?: MenuPageProps['titleSize'];
	};

	export const MENU_PAGE = Object.freeze({
		HOME: {
			title: 'Battleship',
			size: 'lg'
		},
		JOIN: {
			title: 'Join Game'
		},
		SETTINGS: {
			title: 'Settings'
		},
		ABOUT: {
			title: 'About'
		}
	} as const);
</script>

<script lang="ts">
	const game = useGameLogic();

	let page: MenuPageData = $state.raw(MENU_PAGE.HOME);

	const CurrentPage = $derived.by(() => {
		switch (page) {
			case MENU_PAGE.HOME:
				return HomePage;
			case MENU_PAGE.JOIN:
				return JoinPage;
			case MENU_PAGE.SETTINGS:
				return SettingsPage;
			case MENU_PAGE.ABOUT:
				return AboutPage;
		}
	});
</script>

{#snippet HomePage()}
	<!-- New Game will change from Menu to Lobby instead of being a page -->
	<MenuButton
		size="lg"
		onclick={() => {
			game.guiState.call('next');
		}}
	>
		New Game
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			page = MENU_PAGE.JOIN;
		}}
	>
		Join Game
	</MenuButton>
	<!-- Might change Settings to be a component to be accessible during game -->
	<MenuButton
		size="lg"
		onclick={() => {
			page = MENU_PAGE.SETTINGS;
		}}
	>
		Settings
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			page = MENU_PAGE.ABOUT;
		}}
	>
		About
	</MenuButton>
{/snippet}

{#snippet JoinPage()}
	<div
		class="mb-2 flex flex-col gap-2 rounded-md border border-neutral-800 p-2 text-center text-lg font-bold"
	>
		<p class="select-none">Enter Game Code to join</p>
		<p>[GAME CODE INPUT]</p>
	</div>
	<div class="grid grid-cols-2 gap-1">
		<MenuButton
			accent="danger"
			onclick={() => {
				page = MENU_PAGE.HOME;
			}}
		>
			Cancel
		</MenuButton>
		<MenuButton accent="success">Join</MenuButton>
	</div>
{/snippet}

{#snippet SettingsPage()}
	<div
		class="mb-2 grid select-none grid-cols-2 gap-2 rounded-md border border-neutral-800 p-2 text-center text-lg font-bold"
	>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
		<p>[SETTINGS OPTIONS]</p>
	</div>
	<div class="grid grid-cols-2 gap-1">
		<MenuButton
			accent="danger"
			onclick={() => {
				page = MENU_PAGE.HOME;
			}}
		>
			Cancel
		</MenuButton>
		<MenuButton accent="success">Save</MenuButton>
	</div>
{/snippet}

{#snippet AboutPage()}
	<div class="mb-2 flex flex-col gap-2 rounded-md border border-neutral-800 p-4 text-lg font-bold">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde at corrupti mollitia
			doloremque ducimus est, delectus neque praesentium quo aperiam enim vitae accusamus.
			Recusandae beatae repellat dolor velit molestiae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis vel cupiditate doloribus
			quis quisquam eius quaerat in nihil.
		</p>
	</div>
	<MenuButton
		onclick={() => {
			page = MENU_PAGE.HOME;
		}}
	>
		Back
	</MenuButton>
{/snippet}

{#key page}
	<StageElement>
		<MenuPage title={page.title} titleSize={page.size} children={CurrentPage} />
	</StageElement>
{/key}
