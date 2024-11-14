<script lang="ts" module>
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { Game, type GameMode } from '$lib/logic/Game.svelte';
	import { tw } from '$lib/utils/tw';
	import { fly } from 'svelte/transition';

	const GameModes: GameMode[] = ['Classic', 'Salvo', 'Bonus', 'Special'];

	const ModeDescs: Record<GameMode, string> = {
		Classic: 'Classic description. This is a quick description of the game mode selected.',
		Salvo: 'Salvo description. This is a quick description of the game mode selected.',
		Bonus: 'Bonus description. This is a quick description of the game mode selected.',
		Special: 'Special description. This is a quick description of the game mode selected.'
	};

	const InputStyles = {
		base: tw(
			'peer col-start-1 row-start-1 w-full appearance-none rounded-md',
			'border-2 border-neutral-800 outline-none transition-colors'
		),

		Classic: tw('checked:border-sky-900 hover:border-sky-700 focus-visible:border-sky-700'),
		Salvo: tw('checked:border-blue-900 hover:border-blue-700 focus-visible:border-blue-700'),
		Bonus: tw('checked:border-indigo-900 hover:border-indigo-700 focus-visible:border-indigo-700'),
		Special: tw('checked:border-violet-900 hover:border-violet-700 focus-visible:border-violet-700')
	};

	const TextStyles = {
		base: tw(
			'col-start-1 row-start-1 px-5 py-1',
			'text-center text-lg font-semibold tracking-wide transition-colors'
		),

		Classic: tw('hover:text-sky-400 peer-checked:text-sky-200'),
		Salvo: tw('hover:text-blue-400 peer-checked:text-blue-200'),
		Bonus: tw('hover:text-indigo-400 peer-checked:text-indigo-200'),
		Special: tw('hover:text-violet-400 peer-checked:text-violet-200')
	};

	const DescriptionStyles = {
		base: tw(
			'grid h-20 grid-cols-1 grid-rows-1 overflow-hidden rounded-md border-2 px-2 py-1 font-semibold transition-colors'
		),

		Classic: tw('border-sky-900 text-sky-100'),
		Salvo: tw('border-blue-900 text-blue-100'),
		Bonus: tw('border-indigo-900 text-indigo-100'),
		Special: tw('border-violet-900 text-violet-100')
	};
</script>

<script lang="ts">
	const game = Game.fromContext();
</script>

<div class="flex w-full select-none flex-col gap-3.5 rounded-lg border border-neutral-800 p-3.5">
	<h2 class="w-full text-center text-2xl font-bold tracking-wider text-neutral-400">Missions</h2>
	<div class="grid grid-cols-4 gap-1">
		{#each GameModes as name}
			<label class="grid cursor-pointer grid-cols-1 grid-rows-1">
				<input
					class={tw(InputStyles.base, InputStyles[name])}
					type="radio"
					name="{name} mode"
					id="{name}_mode_selector"
					value={name}
					bind:group={game.gameMode}
				/>
				<span class={tw(TextStyles.base, TextStyles[name])}>{name}</span>
			</label>
		{/each}
	</div>
	<div class={tw(DescriptionStyles.base, DescriptionStyles[game.gameMode])}>
		{#key game.gameMode}
			<p
				class="col-start-1 row-start-1 overflow-y-auto"
				in:fly={{
					duration: GLOBAL_ANIMATION_DURATION,
					delay: GLOBAL_ANIMATION_DURATION / 3,
					x: -75
				}}
				out:fly={{ duration: GLOBAL_ANIMATION_DURATION, x: 75 }}
			>
				{ModeDescs[game.gameMode]}
			</p>
		{/key}
	</div>
</div>
