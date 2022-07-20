<script type="typescript">
	import type GalleryPost from '../../interfaces/galleryPost.interface';
	import galleryStore from '../../stores/gallery';
	import PostCard from './postCard.svelte';
	export let galleryPosts: GalleryPost[];

	function imgClickHandler(galleryPost: GalleryPost) {
		$galleryStore.popOutDetail = galleryPost;
	}
</script>

<div class="img-list columns-1">
	{#each galleryPosts as post}
		<div class="w-full img-container hover:shadow-xl">
			<PostCard {post} list />
		</div>
	{/each}
</div>

<style>
	.img-list .img-container {
		margin-bottom: 16px;
	}
	.img-container {
		cursor: pointer;
		transition: 0.24s;
	}
</style>
