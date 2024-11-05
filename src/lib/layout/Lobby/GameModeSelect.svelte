<script lang="ts" module>
	import { GameLogic, type GameMode } from '$lib/logic/Game.svelte';
	import { tw } from '$lib/utils/tw';

	const GameModes: GameMode[] = ['Classic', 'Salvo', 'Bonus', 'Special'];

	const InputStyles = {
		base: tw(
			'peer col-start-1 row-start-1 w-full appearance-none rounded-md',
			'border-2 border-neutral-800 outline-none transition-colors'
		),

		Classic: tw('checked:border-sky-950 hover:border-sky-700 focus-visible:border-sky-700'),
		Salvo: tw('checked:border-blue-950 hover:border-blue-700 focus-visible:border-blue-700'),
		Bonus: tw('checked:border-indigo-950 hover:border-indigo-700 focus-visible:border-indigo-700'),
		Special: tw('checked:border-violet-950 hover:border-violet-700 focus-visible:border-violet-700')
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
</script>

<script lang="ts">
	const game = GameLogic.fromContext();
</script>

<div class="grid select-none grid-cols-4 gap-1">
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
