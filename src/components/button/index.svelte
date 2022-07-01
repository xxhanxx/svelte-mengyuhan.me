<script type="typescript">
	let className: string = '';
	export { className as class };
	export let type: string = '',
		disabled: boolean = false,
		file: boolean = false,
		outlined: boolean = false,
		icon: boolean = false;

	if (outlined) className += ' outlined';
	if (icon) className += ' icon-btn';
</script>

<button {type} {disabled} class={className} on:click on:change>
	{#if file}
		<input {disabled} type="file" id="upload" class="file-input" hidden />
		<label for="upload" />
		<span class="slot-container">
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
		<span class="slot-container">
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
	button {
		position: relative;
		border: none;
		background-color: var(--bgColor-primary);
		font-size: 16px;
		color: #fff;
		padding: 0.6rem 0.8rem;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.24s ease-in-out;
	}
	button :global(svg) {
		fill: #fff;
	}
	button.outlined {
		background-color: transparent;
		border: 2px soild var(--bgColor-primary) !important;
		color: var(--bgColor-primary);
	}

	button:hover {
		background-color: var(--bgColor-primary-hover);
	}
	button.outlined:hover {
		background-color: var(--bgColor-outline-hover);
	}
	button :global(svg) {
		fill: #fff;
	}
	button.outlined :global(svg) {
		fill: var(--bgColor-primary);
	}
	button:active {
		background-color: var(--bgColor-primary-active);
	}
	button.outlined:active {
		background-color: var(--bgColor-outline-active);
	}
	button:disabled {
		cursor: default !important;
		background-color: rgba(0, 0, 0, 0.12) !important;
		color: rgba(0, 0, 0, 0.26) !important;
	}
	button:disabled label {
		cursor: default !important;
	}
	button:disabled :global(svg) {
		fill: rgba(0, 0, 0, 0.26) !important;
	}
	button .slot-container {
		display: flex;
	}
	button .slot-container .icon {
		padding-right: 4px;
	}
	button .slot-container svg {
		transition: 0.24s;
	}
</style>
