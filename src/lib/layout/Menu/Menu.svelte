<script lang="ts" module>
	import MenuButton from '$lib/components/MenuButton.svelte';
	import StageElement from '$lib/components/StageElement.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import { useGUI } from '$lib/game/GUI.svelte';
	import Page from '$lib/layout/Menu/Page.svelte';
	import { initMenu } from './logic.svelte';
</script>

<script lang="ts">
	const gui = useGUI();
	const menu = initMenu();
</script>

{#key menu.page}
	<StageElement>
		<Page title={menu.meta.title} titleSize={menu.meta.size}>
			<Switch value={menu.page}>
				{#snippet home()}
					<!-- New Game will change from Menu to Lobby instead of being a page -->
					<MenuButton
						size="lg"
						onclick={() => {
							gui.newLobby();
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
		</Page>
	</StageElement>
{/key}
