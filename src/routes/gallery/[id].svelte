<script context="module">
	import { get } from 'svelte/store';
	import { mainStore } from '../../stores/main';
	let baseUrl = get(mainStore).baseUrl;
	// @ts-ignore
	export async function load({ params }) {
		const url = baseUrl + '/api/gallery/get?id=' + params.id;
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
	import type GalleryPost from '../../interfaces/galleryPost.interface';
	import PostCard from '../../components/gallery/postCard.svelte';
	export let post: GalleryPost;
</script>

<PostCard {post} />
