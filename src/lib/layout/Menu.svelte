<script lang="ts" module>
	import StageElement from '$lib/components/StageElement.svelte';

	export type MenuPage = {
		title: string;
	};

	export const MENU_PAGE = Object.freeze({
		HOME: {
			title: 'Battleship'
		},
		ABOUT: {
			title: 'About'
		},
		PLAY: {
			title: 'Play'
		}
	} satisfies Record<string, MenuPage>);
</script>

<script lang="ts">
	let page = $state(MENU_PAGE.HOME);
</script>

{#snippet MenuItem(content: string, onclick?: () => void)}
	<li class="w-3/4 overflow-hidden first:rounded-t-lg last:rounded-b-lg">
		<button
			class="group relative w-full overflow-hidden bg-neutral-800 px-2 py-3 text-3xl font-semibold transition-[filter] hover:brightness-110"
			{onclick}
		>
			<p class="transition-transform group-active:scale-90">
				{content}
			</p>
			<span
				class="absolute left-1/2 top-0 flex h-1 w-24 -translate-x-1/2 justify-start overflow-hidden rounded-b-full bg-neutral-900/60"
			>
				<span class="h-full w-0 bg-red-900 transition-[width] group-hover:w-full"></span>
			</span>
			<span
				class="absolute bottom-0 left-1/2 flex h-1 w-24 -translate-x-1/2 justify-end overflow-hidden rounded-t-full bg-neutral-900/60"
			>
				<span class="h-full w-0 bg-red-900 transition-[width] group-hover:w-full"></span>
			</span>
		</button>
	</li>
{/snippet}

<StageElement>
	<div class="flex min-h-64 w-full max-w-lg select-none flex-col gap-10">
		<h1 class="text-center text-6xl font-bold">{page.title}</h1>
		<div class="grid flex-grow grid-cols-1 grid-rows-1">
			{#key page}
				<ul class="col-start-1 row-start-1 flex flex-col items-center gap-2">
					{#if page === MENU_PAGE.HOME}
						{@render MenuItem('Play', () => {
							page = MENU_PAGE.PLAY;
						})}
						{@render MenuItem('About', () => {
							page = MENU_PAGE.ABOUT;
						})}
					{:else if page === MENU_PAGE.ABOUT}
						{@render MenuItem('Back', () => {
							page = MENU_PAGE.HOME;
						})}
					{:else if page === MENU_PAGE.PLAY}
						{@render MenuItem('PvE')}
						{@render MenuItem('Back', () => {
							page = MENU_PAGE.HOME;
						})}
					{/if}
				</ul>
			{/key}
		</div>
	</div>
</StageElement>
