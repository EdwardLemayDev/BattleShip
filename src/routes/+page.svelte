<script lang="ts" module>
	import { dev } from '$app/environment';
	import StageRoot from '$lib/components/StageRoot.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { initDevSettings } from '$lib/logic/DevConfig.svelte';
	import { initGameLogic } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const game = initGameLogic();
	const devConfig = initDevSettings();

	const CurrentStage = $derived.by(() => {
		switch (game.stage) {
			case 'LOADING':
				return Loading;
			case 'INTRO':
				return Intro;
			case 'MENU':
				return Menu;
			case 'LOBBY':
				return Lobby;
		}
	});

	onMount(() => {
		game.loaded();

		if (dev) {
			if (devConfig.skipIntro) game.introCompleted();
			if (devConfig.newLobby) game.createLobby();
		}
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

{#if dev}
	<DevMenu />
{/if}

<StageRoot>
	<CurrentStage />
</StageRoot>
