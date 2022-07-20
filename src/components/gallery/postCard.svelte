<script type="typescript">
	import { goto } from '$app/navigation';

	import type GalleryPost from '../../interfaces/galleryPost.interface';

	import utils from '../../utils';
	export let post: GalleryPost,
		list: boolean = false;
</script>

<div class="shadow-xl">
	{#if post.type === 'Image'}
		<img
			on:click={() => {
				if (list) {
					goto('/gallery/' + post._id);
				}
			}}
			src={post.url}
			alt=""
		/>
	{/if}
	{#if post.type === 'Video'}
		<video controls>
			<source src={post.url} type="video/mp4" />
			<track kind="captions" />
		</video>
	{/if}

	<div
		on:click={() => {
			if (list) {
				goto('/gallery/' + post._id);
			}
		}}
		class="img-detail p-4"
	>
		{#if post.description}
			<div class="text-md">
				{post.description}
			</div>
		{/if}

		<div class="text-sm text-stone-900">
			{utils.formatDate(utils.isoDateToDate(post.createdAt))}
			{#if list}
				<a href={'/gallery/' + post._id} class="float-right font-bold">查看详情</a>
			{/if}
		</div>
	</div>
</div>
