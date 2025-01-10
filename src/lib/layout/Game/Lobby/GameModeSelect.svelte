<script lang="ts" module>
	import { GLOBAL_ANIMATION_DURATION } from '$lib/const';
	import { useGameLogic } from '$lib/logic/Game.svelte';
	import type { Mode } from '$lib/logic/Mode/Mode';
	import { tw } from '$lib/utils/tw';
	import { cva } from 'class-variance-authority';
	import { fly } from 'svelte/transition';

	const GameModeList: Mode.Name[] = ['Classic', 'Salvo', 'Bonus'];
	// , 'Special'

	export const ModeDescs: Record<Mode.Name, string> = {
		Classic:
			'The simplest way to play, ideal for honing your naval combat strategy skills. Players take turns firing one shot at a time, aiming to hit or miss the opponent’s ships. The winner is the first to sink the entire enemy fleet.',
		Salvo:
			'Salvo Mode is similar to Classic, but with a key difference: each operational ship in your fleet fires one shot per turn. For example, if all your ships are still afloat ( even if some have been damaged ), you’ll take five shots. However, if you’ve lost two out of five ships, you’ll only have three shots.',
		Bonus:
			'Bonus Mode resembles Classic, but with an exciting twist: each time you hit an enemy ship, you earn an extra shot. You can keep firing until you miss your target!',
		Special: ''
	};

	const buttonStyle = cva(
		[
			'peer col-start-1 row-start-1 w-full appearance-none rounded-md',
			'border-2 border-neutral-800 outline-none transition-colors'
		],
		{
			variants: {
				mode: {
					Classic: [
						'checked:border-sky-900',
						'hover:border-sky-700',
						'focus-visible:border-sky-700'
					],
					Salvo: [
						'checked:border-blue-900',
						'hover:border-blue-700',
						'focus-visible:border-blue-700'
					],
					Bonus: [
						'checked:border-indigo-900',
						'hover:border-indigo-700',
						'focus-visible:border-indigo-700'
					],
					Special: [
						'checked:border-violet-900',
						'hover:border-violet-700',
						'focus-visible:border-violet-700'
					]
				}
			}
		}
	);

	const nameStyle = cva(
		[
			'col-start-1 row-start-1 px-5 py-1',
			'text-center text-lg font-semibold tracking-wide transition-colors'
		],
		{
			variants: {
				mode: {
					Classic: 'hover:text-sky-400 peer-checked:text-sky-200',
					Salvo: 'hover:text-blue-400 peer-checked:text-blue-200',
					Bonus: 'hover:text-indigo-400 peer-checked:text-indigo-200',
					Special: 'hover:text-violet-400 peer-checked:text-violet-200'
				}
			}
		}
	);

	const descriptionStyle = cva(
		[
			'grid h-36 grid-cols-1 grid-rows-1 overflow-hidden rounded-md',
			'border-2 px-2 py-1 font-semibold transition-colors'
		],
		{
			variants: {
				mode: {
					Classic: 'border-sky-900 text-sky-100 selection:bg-sky-800',
					Salvo: 'border-blue-900 text-blue-100 selection:bg-blue-800',
					Bonus: 'border-indigo-900 text-indigo-100 selection:bg-indigo-800',
					Special: 'border-violet-900 text-violet-100 selection:bg-violet-800'
				}
			}
		}
	);
</script>

<script lang="ts">
	const game = useGameLogic();
</script>

<div class="flex w-full flex-col gap-3.5 rounded-lg border border-neutral-800 p-3.5">
	<h2 class="w-full select-none text-center text-2xl font-bold tracking-wider text-neutral-400">
		Missions
	</h2>
	<div class="grid select-none grid-cols-3 gap-1">
		{#each GameModeList as mode}
			<label class="grid cursor-pointer grid-cols-1 grid-rows-1">
				<input
					class={tw(buttonStyle({ mode }))}
					type="radio"
					name="{mode} mode"
					id="{mode}_mode_selector"
					value={mode}
					bind:group={game.mode}
				/>
				<span class={tw(nameStyle({ mode }))}>{mode}</span>
			</label>
		{/each}
	</div>
	<div class={tw(descriptionStyle({ mode: game.mode }))}>
		{#key game.mode}
			<p
				class="col-start-1 row-start-1 overflow-y-auto p-1 text-justify"
				in:fly={{
					duration: GLOBAL_ANIMATION_DURATION,
					delay: GLOBAL_ANIMATION_DURATION / 3,
					x: -75
				}}
				out:fly={{ duration: GLOBAL_ANIMATION_DURATION, x: 75 }}
			>
				{ModeDescs[game.mode as Mode.Name]}
			</p>
		{/key}
	</div>
</div>
