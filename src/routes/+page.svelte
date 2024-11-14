<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { DevSettings } from '$lib/logic/DevSettings.svelte';
	import { GameLogic } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const devSettings = DevSettings && new DevSettings();
	const game = new GameLogic();

	const CurrentStage = $derived.by(() => {
		switch (game.guiState.current) {
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
		if (devSettings && devSettings.skipIntro) {
			game.guiState.dispatch('skip');
		} else {
			game.guiState.dispatch('next');
		}
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<DevMenu />

<StageRoot>
	<CurrentStage />
</StageRoot>
