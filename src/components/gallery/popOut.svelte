<script type="typescript">
	// deprecated
	import type GalleryPost from '../../interfaces/galleryPost.interface';
	import galleryStore from '../../stores/gallery';
	import Wrap from '../wrap.svelte';
	import { fade } from 'svelte/transition';

	import utils from '../../utils';

	export let popOutDetail: GalleryPost;

	function close() {
		$galleryStore.popOutDetail = {
			_id: '',
			url: '',
			type: '',
			createdAt: '',
			updatedAt: ''
		};
	}
</script>

<Wrap on:click={close} />
<div transition:fade={{ duration: 240 }} class="popOut shadow-xl">
	{#if popOutDetail.type === 'Image'}
		<img src={popOutDetail.url} alt="" />
	{/if}
	{#if popOutDetail.type === 'Video'}
		<video controls>
			<source src={popOutDetail.url} type="video/mp4" />
			<track kind="captions" />
		</video>
	{/if}

	<div class="img-detail p-4">
		{#if popOutDetail.description}
			<div class="text-md">
				{popOutDetail.description}
			</div>
		{/if}
		<div class="text-sm text-stone-900">
			{utils.formatDate(utils.isoDateToDate(popOutDetail.createdAt))}
		</div>
	</div>
</div>

<style>
	.popOut {
		position: fixed;
		left: 50%;
		top: 50%;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		transform: translate(-50%, -50%);
		z-index: 102;
		border-radius: 5px;
		overflow: hidden;
		justify-content: center;
		align-items: center;
	}

	.img-detail {
		background-color: #fff;
	}

	.popOut img,
	.popOut video {
		width: auto;
		height: auto;
		width: 100%;
		max-height: 80vh;
	}
</style>
