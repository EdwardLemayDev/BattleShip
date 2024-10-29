<script lang="ts" module>
	import { dev } from '$app/environment';
	import StageRoot from '$lib/components/StageRoot.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { DevConfig } from '$lib/logic/DevConfig.svelte';
	import { GameLogic } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const game = new GameLogic();
	const devConfig = new DevConfig();

	onMount(() => {
		if (dev && devConfig.skipIntro) {
			game.introCompleted();
		} else {
			game.loaded();
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
	{#if game.stage === 'LOADING'}
		<Loading />
	{:else if game.stage === 'INTRO'}
		<Intro />
	{:else if game.stage === 'MENU'}
		<Menu />
	{/if}
</StageRoot>
