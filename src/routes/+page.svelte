<script lang="ts" module>
	import StageRoot from '$lib/components/StageRoot.svelte';
	import { Dev } from '$lib/dev';
	import Intro from '$lib/layout/Intro.svelte';
	import Loading from '$lib/layout/Loading.svelte';
	import Lobby from '$lib/layout/Lobby/Lobby.svelte';
	import Menu from '$lib/layout/Menu.svelte';
	import { GUI } from '$lib/logic/GUI.svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const dev = Dev && Dev.fromContext();
	const gui = GUI.fromContext();

	const CurrentStage = $derived.by(() => {
		switch (gui.current) {
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
		if (dev && dev.skipIntro) {
			gui.dispatch('skip');
		} else {
			gui.dispatch('next');
		}
	});
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<StageRoot>
	<CurrentStage />
</StageRoot>
