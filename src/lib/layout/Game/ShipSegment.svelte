<script lang="ts" module>
	import type { Player } from '$lib/logic/Player/Player.svelte';

	export type ShipSegmentProps = {
		id: number;
		section: number;
		direction: Player.Ship.Direction;
		color: string;
	};
</script>

<script lang="ts">
	let { id, section, direction, color }: ShipSegmentProps = $props();
</script>

<svg
	style:--color={color}
	class="absolute inset-0 text-[--color] {direction === 'h' ? '-rotate-90' : ''}"
	viewBox="0 0 1 1"
>
	<use href="#{id}_{section}" />
</svg>
