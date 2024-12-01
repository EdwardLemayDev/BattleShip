<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import { useGUI } from '$lib/game/GUI.svelte';
	import DevMenu from '$lib/layout/DevMenu.svelte';
	import Intro from '$lib/layout/Intro/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu/Menu.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const gui = useGUI();

	const CurrentStage = $derived.by(() => {
		switch (gui.state) {
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
		gui.loaded();
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<StageRoot>
	<CurrentStage />
</StageRoot>

<DevMenu />
