<script lang="ts" module>
	import { tw } from '$lib/utils/tw';

	const ProfileStyles = {
		tile: {
			base: tw('flex flex-col gap-2 rounded-lg border p-2'),

			ally: tw('border-green-950 bg-green-900/20'),
			ennemy: tw('border-red-950 bg-red-900/20')
		},

		title: {
			base: tw('text-lg font-bold tracking-wide'),

			ally: tw('text-green-100/50'),
			ennemy: tw('text-red-100/50')
		},

		fleetName: {
			base: tw(
				'appearance-none rounded-md border-2 bg-transparent px-1.5 py-0.5 font-semibold outline-none transition-colors'
			),

			ally: tw(
				'border-green-950 text-green-100 placeholder:text-green-800/50 focus:border-green-800'
			),
			ennemy: tw('border-red-950 text-red-100')
		}
	};
</script>

<div class="grid w-full select-none grid-cols-2 gap-4">
	<div class={tw(ProfileStyles.tile.base, ProfileStyles.tile.ally)}>
		<p class={tw(ProfileStyles.title.base, ProfileStyles.title.ally)}>Ally Forces</p>
		<input
			class={tw(ProfileStyles.fleetName.base, ProfileStyles.fleetName.ally)}
			type="text"
			name="Ally name"
			id="ally_name"
			placeholder="- Fleet Name -"
			maxlength="25"
		/>
	</div>
	<div class={tw(ProfileStyles.tile.base, ProfileStyles.tile.ennemy)}>
		<p class={tw(ProfileStyles.title.base, ProfileStyles.title.ennemy)}>Ennemy Forces</p>
		<p class={tw(ProfileStyles.fleetName.base, ProfileStyles.fleetName.ennemy)}>
			Ennemy Fleet Name
		</p>
	</div>
</div>
