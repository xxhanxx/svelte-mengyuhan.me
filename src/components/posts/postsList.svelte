<script type="typescript">
	import type Post from '../../interfaces/post.interface';
	import PostCard from './postCard.svelte';
	export let posts: Post[];
</script>

{#if posts}
	<div class="posts-container">
		{#each posts as post}
			<PostCard {post} />
		{/each}
	</div>
{/if}
