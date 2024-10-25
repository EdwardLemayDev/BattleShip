<script lang="ts">
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import { GameLogic, GameStage } from '$lib/logic/Game.svelte';
	import { onMount } from 'svelte';

	const game = new GameLogic();

	onMount(() => {
		game.stage = GameStage.INTRO;
	});
</script>

<svelte:head>
	<title>BattleShip</title>
</svelte:head>

<div class="absolute inset-0 bg-neutral-950 text-neutral-50">
	{#if game.stage === GameStage.LOADING}
		<Loading />
	{:else if game.stage === GameStage.INTRO}
		<Intro
			onIntroDone={() => {
				game.stage = GameStage.MENU;
			}}
		/>
	{/if}
</div>
