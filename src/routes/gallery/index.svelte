<script context="module">
	import { get } from 'svelte/store';
	import { mainStore } from '../../stores/main';
	let baseUrl = get(mainStore).baseUrl;
	export async function load() {
		const url = baseUrl + '/api/gallery/get';
		const res = await fetch(url);
		const galleryPosts = await res.json();
		if (galleryPosts) return { props: { galleryPosts } };
	}
</script>

<script type="typescript">
	import type GalleryPost from '../../interfaces/galleryPost.interface';
	import PostsList from '../../components/gallery/postsList.svelte';
	import Button from '../../components/button/index.svelte';
	import PopOut from '../../components/gallery/popOut.svelte';

	import galleryStore from '../../stores/gallery';

	export let galleryPosts: GalleryPost[];
	let popOutDetail: GalleryPost;

	$: if ($galleryStore.popOutDetail) {
		popOutDetail = $galleryStore.popOutDetail;
	}
</script>

<svelte:head>
	<title>Gallery - mengyuhan.me</title>
</svelte:head>

<div>
	{#if popOutDetail.url !== ''}
		<PopOut {popOutDetail} />
	{/if}
	<Button to="/gallery/new" icon class="w-full mb-4">
		<div class="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 0 24 24"
				width="24px"
				fill="#000000"
				><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg
			>
		</div>
		<span>Add Resource</span></Button
	>
	<PostsList {galleryPosts} />
</div>
