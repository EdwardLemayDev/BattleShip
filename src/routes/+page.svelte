<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import { useCore } from '$lib/core/Core.svelte';
	import GameBoard from '$lib/layout/Game/GameBoard.svelte';
	import Intro from '$lib/layout/Intro/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu/Menu.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const core = useCore();

	const CurrentStage = $derived.by(() => {
		switch (core.gui.current) {
			case 'loading':
				return Loading;
			case 'intro':
				return Intro;
			case 'menu':
				return Menu;
			case 'lobby':
				return Lobby;
			case 'game':
				return GameBoard;
		}
	});

	onMount(() => {
		core.gui.send('loaded');
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<!-- <DevMenu /> -->

<StageRoot>
	<CurrentStage />
</StageRoot>
