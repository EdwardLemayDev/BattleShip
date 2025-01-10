<script lang="ts" module>
	import Switch from '$lib/components/Switch.svelte';
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import DevMenu from '$lib/layout/Dev/DevMenu.svelte';
	import Game from '$lib/layout/Game/Game.svelte';
	import Intro from '$lib/layout/Intro/Intro.svelte';
	import Menu from '$lib/layout/Menu/Menu.svelte';
	import { useCoreLogic } from '$lib/logic/Core.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	const core = useCoreLogic();

	onMount(core.loaded);
</script>

<svelte:head>
	<title>Battleship</title>
</svelte:head>

<main class="absolute inset-0">
	{#key core.state}
		<div
			class="absolute inset-0 grid place-items-center overflow-hidden"
			in:fade={{ duration: GLOBAL_ANIMATION_DURATION, delay: GLOBAL_ANIMATION_DURATION * 0.75 }}
			out:fade={{ duration: GLOBAL_ANIMATION_DURATION }}
		>
			<Switch value={core.state}>
				{#snippet loading()}
					<noscript class="flex w-full max-w-2xl flex-col gap-6">
						<h1 class="text-center text-4xl font-extrabold">
							<span class="text-yellow-500">!!</span>
							<span>Limited browser capabilities</span>
							<span class="text-yellow-500">!!</span>
						</h1>
						<p class="text-xl font-bold">
							JavaScript is currently disabled or unavailable. Please enable it or try using a
							different browser.
						</p>
					</noscript>
				{/snippet}

				{#snippet intro()}<Intro />{/snippet}
				{#snippet menu()}<Menu />{/snippet}
				{#snippet game()}<Game />{/snippet}
			</Switch>
		</div>
	{/key}

	<DevMenu />
</main>
