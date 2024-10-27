<script lang="ts">
	import StageRoot from '$lib/components/StageRoot.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { GameLogic, GameStage } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';

	const game = new GameLogic();

	onMount(() => {
		game.stage = GameStage.INTRO;
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

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
