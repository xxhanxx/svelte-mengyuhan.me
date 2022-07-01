<script type="typescript">
	import type Post from '../../interfaces/post.interface';
	export let post: Post;

	import utils from '../../utils';
</script>

<div class="post-card rounded-md mb-4">
	<a href="/post/{post._id}">
		<div class="post-card-content py-4 px-6">
			<h1 class="text-2xl uppercase">{post.title}</h1>
			<p class="my-1 mb-4">{post.desc}</p>
			<p class="text-xs text-gray-500 flex items-center">
                <span class="mr-1 flex items-center">
                    0 <span class="icon">
                        <svg
                            class="fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            height="12px"
                            viewBox="0 0 24 24"
                            width="12px"
                            ><path d="M0 0h24v24H0z" fill="none" /><path
                                d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                            /></svg
                        ></span
                    >
                </span> · {post.username} · {utils.formatDate(utils.isoDateToDate(post.createdAt))}
			</p>
		</div>
	</a>
</div>

<style>
	.post-card {
		transition: 0.24s;
	}
	.post-card a {
		text-decoration: none;
	}
	.post-card:hover {
		background-color: var(--postCard-bgColor-hover);
	}
	.icon {
		display: inline-block;
	}
</style>
