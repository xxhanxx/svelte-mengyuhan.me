<script context="module">
	import { get } from 'svelte/store';
	import { mainStore } from '../stores/main';
	let baseUrl = get(mainStore).baseUrl;
	export async function load() {
		const url = baseUrl + '/api/post/get';
		const res = await fetch(url);
		const posts = await res.json();
		if (posts) return { props: { posts } };
	}
</script>

<script type="typescript">
	import type Post from '../interfaces/post.interface';
	import PostsList from '../components/posts/postsList.svelte';
	export let posts: Post[];

	let searchTxt = '';
	let filteredPosts: Post[];
	$: if (searchTxt && posts.length > 0) {
		filteredPosts = posts.filter((post) => {
			return post.title.toLowerCase().includes(searchTxt.toLowerCase());
		});
	} else {
		filteredPosts = posts;
	}
</script>

<svelte:head>
	<title>Posts - mengyuhan.me</title>
</svelte:head>

<div class="posts">
	<input
		placeholder="Search here"
		class="w-full border-gray-200 border rounded-md outline-none py-2 px-3 mb-6"
		bind:value={searchTxt}
		type="text"
	/>
	{#if filteredPosts && filteredPosts.length > 0}
		<PostsList posts={filteredPosts} />
	{:else}
		<p class="text-3xl">No post was found</p>
	{/if}
</div>
