<script context="module">
	import { get } from 'svelte/store';
	import { mainStore } from '../stores/main';
	let baseUrl = get(mainStore).baseUrl;
	export async function load() {
		const url = baseUrl + '/api/about';
		const res = await fetch(url);
		const about = await res.json();
		if (about) return { props: { about } };
	}
</script>

<script type="typescript">
	export let about: { content: string };
</script>

<svelte:head>
	<title>About - mengyuhan.me</title>
</svelte:head>

<div>
	{@html about.content}
</div>
