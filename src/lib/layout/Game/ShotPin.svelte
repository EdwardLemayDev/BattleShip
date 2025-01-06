<script lang="ts" module>
	import { cva } from 'class-variance-authority';

	export type ShotPinProps = {
		hit?: boolean;
	};

	const ShotPinStyle = cva('absolute inset-2.5 rounded-full border-2', {
		variants: {
			hit: {
				true: 'border-red-500 bg-red-600',
				false: 'border-neutral-200 bg-neutral-300'
			}
		}
	});
</script>

<script lang="ts">
	let { hit = false } = $props();
</script>

<span class={ShotPinStyle({ hit })}></span>
