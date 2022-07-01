<script type="typescript">
	import { scale } from 'svelte/transition';
	import Button from '../components/button/index.svelte';
	let className: string = 'shadow';
	export { className as class };
	export let hidden: boolean = true;

	function backToTop() {
		document.documentElement.scrollTop = 0;
	}
</script>

{#if !hidden}
	<div in:scale={{ duration: 240 }} out:scale={{ duration: 240 }} id="backToTop" class={className}>
		<Button on:click={backToTop} class="backToTopBtn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 0 24 24"
				width="24px"
				fill="#fff"
				><path d="M0 0h24v24H0z" fill="none" /><path
					d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
				/></svg
			>
		</Button>
	</div>
{/if}

<style>
	#backToTop {
		position: fixed;
		border-radius: 50%;
		overflow: hidden;
		bottom: 4vh;
		right: 4vh;
	}
	#backToTop :global(.backToTopBtn) {
		padding: 10px;
		color: white;
	}
</style>
