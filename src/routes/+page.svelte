<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import { Dev, DevMenu } from '$lib/dev';
	import Intro from '$lib/layout/Intro/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { Game } from '$lib/logic/Game.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const dev = Dev && new Dev();
	const gui = new GUI();
	const game = new Game();

	const CurrentStage = $derived.by(() => {
		switch (gui.stage) {
			case 'loading':
				return Loading;
			case 'intro':
				return Intro;
			case 'menu':
				return Menu;
			case 'lobby':
				return Lobby;
		}
	});

	onMount(() => {
		gui.dispatch('loaded');
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<DevMenu />

<StageRoot>
	<CurrentStage />
</StageRoot>
