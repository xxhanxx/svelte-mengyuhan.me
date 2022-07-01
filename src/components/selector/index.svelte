<script type="typescript">
	let className: string = '';
	export { className as class };
	export let value: string = '',
		disabled: boolean = false,
		name: string = '',
		id: string = '',
		data: Array<any> = [];

	if (data.length >= 1) value = data[0];
</script>

<div class="selector">
	<select bind:value {disabled} {name} {id} class={className}>
		{#each data as item}
			<option value={item}>{item}</option>
		{/each}
	</select>
</div>

<style>
	.selector select {
		cursor: pointer;
		outline: 2px solid transparent;
		outline-offset: 2px;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-color: rgb(229 231 235 / var(--tw-border-opacity));
		border-width: 1px;
		border-radius: 0.375rem;
		transition: 0.24s;
		--tw-border-opacity: 1;
	}

	.selector select:focus {
		border-color: var(--color-primary);
	}
</style>
