<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import MenuPage from '$lib/components/MenuPage.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import { MainMenuStage } from './MainMenuStage.svelte';
</script>

<script lang="ts">
	const gui = GUI.fromContext();
	const menu = new MainMenuStage();

	const CurrentPage = $derived.by(() => {
		switch (menu.stage) {
			case 'home':
				return HomePage;
			case 'join':
				return JoinPage;
			case 'settings':
				return SettingsPage;
			case 'about':
				return AboutPage;
		}
	});
</script>

{#snippet HomePage()}
	<MenuButton
		size="lg"
		onclick={() => {
			gui.dispatch('lobby');
		}}
	>
		New Game
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			menu.dispatch('join');
		}}
	>
		Join Game
	</MenuButton>
	<!-- Might change Settings to be a component to be accessible during game -->
	<MenuButton
		size="lg"
		onclick={() => {
			menu.dispatch('settings');
		}}
	>
		Settings
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			menu.dispatch('about');
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
				menu.dispatch('back');
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
				menu.dispatch('back');
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
			menu.dispatch('back');
		}}
	>
		Back
	</MenuButton>
{/snippet}

{#key menu.stage}
	<StageElement>
		<MenuPage title={menu.title} titleSize={menu.size} children={CurrentPage} />
	</StageElement>
{/key}
