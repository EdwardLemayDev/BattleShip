<script lang="ts" module>
	import { tw } from '$lib/utils/tw';
	import { cva } from 'class-variance-authority';

	const cardStyle = cva('flex flex-col gap-2 rounded-lg border p-2', {
		variants: {
			player: {
				p1: 'border-green-950 bg-green-900/20',
				p2: 'border-red-950 bg-red-900/20'
			}
		}
	});

	const titleStyle = cva('text-lg font-bold tracking-wide', {
		variants: {
			player: {
				p1: 'text-green-100/50',
				p2: 'text-red-100/50'
			}
		}
	});

	const nameStyle = cva(
		[
			'appearance-none rounded-md border-2 bg-transparent px-1.5 py-0.5',
			'font-semibold outline-none transition-colors'
		],
		{
			variants: {
				player: {
					p1: [
						'border-green-950 text-green-100',
						'placeholder:text-green-800/50 focus:border-green-800'
					],
					p2: 'border-red-950 text-red-100'
				}
			}
		}
	);
</script>

<div class="grid w-full select-none grid-cols-2 gap-4">
	<div class={tw(cardStyle({ player: 'p1' }))}>
		<span class={tw(titleStyle({ player: 'p1' }))}>Ally Forces</span>
		<input
			class={tw(nameStyle({ player: 'p1' }))}
			type="text"
			name="Ally name"
			id="ally_name"
			placeholder="- Fleet Name -"
			maxlength="25"
			autocomplete="off"
		/>
	</div>
	<div class={tw(cardStyle({ player: 'p2' }))}>
		<p class={tw(titleStyle({ player: 'p2' }))}>Ennemy Forces</p>
		<p class={tw(nameStyle({ player: 'p2' }))}>Ennemy Fleet Name</p>
	</div>
</div>
