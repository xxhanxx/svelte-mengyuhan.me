<script type="typescript">
	import { goto } from '$app/navigation';
	let buttonProps = {
		class: [$$restProps.class]
	};

	let className: string = '';
	export { className as class };
	export let type: string = '',
		to: string = '',
		disabled: boolean = false,
		file: boolean = false,
		outlined: boolean = false,
		icon: boolean = false;
	className += ' yuhan-btn';
	if (outlined) className += ' outlined';
	if (icon) className += ' icon-btn';

	function target() {
		if (to) goto(to);
	}
</script>

<button {...buttonProps} {type} {disabled} class={className} on:click={target} on:change>
	{#if file}
		<input {disabled} type="file" id="upload" class="file-input" hidden />
		<label for="upload" />
		<span class="slot-container justify-center align-center">
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					><g><rect fill="none" height="24" width="24" /></g><g
						><path
							d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H15v-8h5V8L14,2z M13,9V3.5L18.5,9H13z M17,21.66V16h5.66v2h-2.24 l2.95,2.95l-1.41,1.41L19,19.41l0,2.24H17z"
						/></g
					></svg
				>
			</div>
			<slot />
		</span>
	{:else}
		<span on:click class="slot-container justify-center align-center">
			<slot />
		</span>
	{/if}
</button>

<style>
	label {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.yuhan-btn {
		display: block;
		position: relative;
		text-decoration: none;
		border: none;
		background-color: var(--bgColor-primary);
		font-size: 16px;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.24s ease-in-out;
	}
	.yuhan-btn :global(svg) {
		fill: #fff;
	}
	.yuhan-btn.outlined {
		background-color: transparent;
		border: 2px soild var(--bgColor-primary) !important;
		color: var(--bgColor-primary);
	}

	.yuhan-btn:hover {
		background-color: var(--bgColor-primary-hover);
	}
	.yuhan-btn.outlined:hover {
		background-color: var(--bgColor-outline-hover);
	}
	.yuhan-btn :global(svg) {
		fill: #fff;
	}
	.yuhan-btn.outlined :global(svg) {
		fill: var(--bgColor-primary);
	}
	.yuhan-btn:active {
		background-color: var(--bgColor-primary-active);
	}
	.yuhan-btn.outlined:active {
		background-color: var(--bgColor-outline-active);
	}
	.yuhan-btn:disabled {
		cursor: default !important;
		background-color: rgba(0, 0, 0, 0.12) !important;
		color: rgba(0, 0, 0, 0.26) !important;
	}
	.yuhan-btn:disabled label {
		cursor: default !important;
	}
	.yuhan-btn:disabled :global(svg) {
		fill: rgba(0, 0, 0, 0.26) !important;
	}
	.yuhan-btn .slot-container {
		display: flex;

		padding: 0.6rem 0.8rem;
	}
	.yuhan-btn .slot-container .icon {
		padding-right: 4px;
	}
	.yuhan-btn .slot-container svg {
		transition: 0.24s;
	}
</style>
