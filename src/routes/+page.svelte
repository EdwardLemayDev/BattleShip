<script lang="ts" module>
	import { dev } from '$app/environment';
	import StageRoot from '$lib/components/StageRoot.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { initDevSettings } from '$lib/logic/DevSettings.svelte';
	import { initGameLogic } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const devSettings = initDevSettings();
	const game = initGameLogic();

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
		if (dev && devSettings?.skipIntro) {
			game.guiState.call('skip');
		} else {
			game.guiState.call('next');
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
