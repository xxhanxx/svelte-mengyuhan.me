<script context="module">
	import { get } from 'svelte/store';
	import { mainStore } from '../../stores/main';

	let baseUrl = get(mainStore).baseUrl;
	// @ts-ignore
	export async function load({ params }) {
		const url = baseUrl + '/api/post/get?id=' + params.id;
		const res = await fetch(url);
		const post = await res.json();
		if (post && post._id) {
			return {
				props: { post }
			};
		} else {
			return {
				props: { post: null }
			};
		}
	}
</script>

<script type="typescript">
	import type Post from '../../interfaces/post.interface';
	import SvelteMarkdown from 'svelte-markdown';
	export let post: Post;	
</script>

<svelte:head>
	<title>{post ? post.title : '404 NOT FOUND'} - mengyuhan.me</title>
</svelte:head>

{#if post}
	<article class="markdown-container prose prose-xl">
		<SvelteMarkdown source={post.content} />
	</article>
{:else}
	<h1 class="text-3xl">The post you request is not exist.</h1>
{/if}

<style>
</style>
