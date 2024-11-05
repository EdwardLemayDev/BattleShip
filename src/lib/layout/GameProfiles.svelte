<script lang="ts" module>
	import { tw } from '$lib/utils/tw';

	const ProfileStyles = {
		base: tw('aspect-square rounded-lg border-2'),

		ally: tw('border-green-950 bg-green-900/20'),
		ennemy: tw('border-red-950 bg-red-900/20')
	};
</script>

<div class="grid select-none grid-cols-2 gap-4 px-4">
	<div class={tw(ProfileStyles.base, ProfileStyles.ally)}>
		<p class="text-center text-lg font-bold tracking-wide text-green-100/50">Ally Forces</p>
	</div>
	<div class={tw(ProfileStyles.base, ProfileStyles.ennemy)}>
		<p class="text-center text-lg font-bold tracking-wide text-red-100/50">Ennemy Forces</p>
	</div>
</div>
