<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { blur } from 'svelte/transition';
	import { setMenuLogic, type MenuStates } from './logic.svelte';

	const MENU_TITLE: Record<MenuStates, string> = {
		home: 'Battleship',
		join: 'Join Game',
		settings: 'Settings',
		about: 'About'
	};

	const LOCAL_ANIMATION_DURATION = GLOBAL_ANIMATION_DURATION * 0.75;
	const LOCAL_ANIMATION_DELAY = LOCAL_ANIMATION_DURATION * 0.4;
</script>

<script lang="ts">
	const core = useCoreLogic();
	const menu = setMenuLogic();

	const title = $derived(MENU_TITLE[menu.page]);
</script>

{#key menu.page}
	<div
		class="col-start-1 row-start-1 flex w-full max-w-xl flex-col items-center gap-10"
		in:blur={{ duration: LOCAL_ANIMATION_DURATION, delay: LOCAL_ANIMATION_DELAY }}
		out:blur={{ duration: LOCAL_ANIMATION_DURATION }}
	>
		<h1
			class="flex min-h-24 select-none items-center justify-center text-7xl font-bold tracking-widest text-neutral-100"
		>
			{title}
		</h1>
		<div class="flex min-h-72 w-full max-w-md flex-col gap-2">
			<Switch value={menu.page}>
				{#snippet home()}
					<!-- New Game will change from Menu to Lobby instead of being a page -->
					<MenuButton
						size="lg"
						onclick={() => {
							core.createLobby();
						}}>New Game</MenuButton
					>
					<MenuButton
						size="lg"
						onclick={() => {
							menu.open('join');
						}}
					>
						Join Game
					</MenuButton>
					<!-- Might change Settings to be a component to be accessible during game -->
					<MenuButton
						size="lg"
						onclick={() => {
							menu.open('settings');
						}}
					>
						Settings
					</MenuButton>
					<MenuButton
						size="lg"
						onclick={() => {
							menu.open('about');
						}}
					>
						About
					</MenuButton>
				{/snippet}

				{#snippet join()}
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
								menu.back();
							}}>Cancel</MenuButton
						>
						<MenuButton accent="success">Join</MenuButton>
					</div>
				{/snippet}

				{#snippet settings()}
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
								menu.back();
							}}
						>
							Cancel
						</MenuButton>
						<MenuButton accent="success">Save</MenuButton>
					</div>
				{/snippet}

				{#snippet about()}
					<div
						class="mb-2 flex flex-col gap-2 rounded-md border border-neutral-800 p-4 text-lg font-bold"
					>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde at corrupti
							mollitia doloremque ducimus est, delectus neque praesentium quo aperiam enim vitae
							accusamus. Recusandae beatae repellat dolor velit molestiae.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis vel cupiditate
							doloribus quis quisquam eius quaerat in nihil.
						</p>
					</div>
					<MenuButton
						onclick={() => {
							menu.back();
						}}
					>
						Back
					</MenuButton>
				{/snippet}
			</Switch>
		</div>
	</div>
{/key}
