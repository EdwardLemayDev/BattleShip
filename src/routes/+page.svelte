<script lang="ts" module>
	import { dev } from '$app/environment';
	import StageRoot from '$lib/components/StageRoot.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { initDevConfig } from '$lib/logic/DevConfig.svelte';
	import { GameLogic, GameStage } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const game = new GameLogic();
	initDevConfig();

	onMount(() => {
		game.stage = GameStage.INTRO;
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

{#if dev}
	<DevMenu />
{/if}

<StageRoot>
	{#if game.stage === GameStage.LOADING}
		<Loading />
	{:else if game.stage === GameStage.INTRO}
		<Intro
			onIntroDone={() => {
				game.stage = GameStage.MENU;
			}}
		/>
	{:else if game.stage === GameStage.MENU}
		<Menu />
	{/if}
</StageRoot>
