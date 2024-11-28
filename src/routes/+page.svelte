<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import { useCore } from '$lib/core/Core.svelte';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const { states, loaded } = useCore();

	const CurrentStage = $derived.by(() => {
		switch (states.main) {
			case 'loading':
				return Loading;
			case 'intro':
				return Intro;
			case 'menu':
				return Menu;
			case 'lobby':
				return Lobby;
			// case 'game':
			// 	return GameBoard;
		}
	});

	onMount(loaded);
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<StageRoot>
	<CurrentStage />
</StageRoot>
