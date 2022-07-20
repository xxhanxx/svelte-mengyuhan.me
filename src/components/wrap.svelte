<script>
	import { fade } from 'svelte/transition';
</script>

<div on:click transition:fade={{ duration: 240 }} class="wrap" />

<style>
	.wrap {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
