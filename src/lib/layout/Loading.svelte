<script lang="ts" module>
	import StageElement from '../components/StageElement.svelte';
</script>

<StageElement static>
	<noscript class="flex w-full max-w-2xl flex-col gap-6">
		<h1 class="text-4xl font-extrabold">
			<span class="text-yellow-500">!!</span>
			<span>Limited browser capabilities</span>
			<span class="text-yellow-500">!!</span>
		</h1>
		<p class="text-xl font-bold">
			JavaScript is currently disabled or unavailable. Please enable it or try using a different
			browser.
		</p>
	</noscript>
</StageElement>
