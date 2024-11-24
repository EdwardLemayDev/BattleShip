<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import MenuPage from '$lib/components/MenuPage.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import { useCore } from '$lib/core/Core.svelte';
	import type { MenuStates } from '$lib/core/States.svelte';

	class MenuMeta {
		#current;

		readonly title = $derived.by(() => {
			switch (this.#current()) {
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
			switch (this.#current()) {
				case 'home':
					return 'lg';
				case 'join':
				case 'settings':
				case 'about':
					return 'md';
			}
		});

		constructor(current: () => MenuStates) {
			this.#current = current;
		}
	}
</script>

<script lang="ts">
	const { states, events } = useCore();
	const meta = new MenuMeta(() => states.sub as MenuStates);

	const CurrentPage = $derived.by(() => {
		switch (states.sub as MenuStates) {
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
			events.goto('lobby');
		}}
	>
		New Game
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			events.goto('join');
		}}
	>
		Join Game
	</MenuButton>
	<!-- Might change Settings to be a component to be accessible during game -->
	<MenuButton
		size="lg"
		onclick={() => {
			events.goto('settings');
		}}
	>
		Settings
	</MenuButton>
	<MenuButton
		size="lg"
		onclick={() => {
			events.goto('about');
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
				events.back();
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
				events.back();
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
			events.back();
		}}
	>
		Back
	</MenuButton>
{/snippet}

{#key states.sub}
	<StageElement>
		<MenuPage title={meta.title} titleSize={meta.size} children={CurrentPage} />
	</StageElement>
{/key}
