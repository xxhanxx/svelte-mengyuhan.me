<script>
	import { page } from '$app/stores';
</script>

<nav class="flex border-b border-b-gray-100">
	<div class="nav-container">
        <a class:active={$page.url.pathname === '/'} href="/">About</a>
	    <a class:active={$page.url.pathname === '/posts'} href="/posts">Posts</a>
        <!-- <a class:active={$page.url.pathname === '/post/submit'} href="/post/submit">Submit Post</a> -->
        <a class:active={$page.url.pathname === '/upload'} href="/upload">Upload</a>
    </div>
</nav>

<style>
	a {
        display: inline-block;
        padding: 8px 0;
		margin-right: 15px;
        color: var(--color-primary-hover);
        transition: .24s;
        text-decoration: none;
	}
    .nav-container:hover a{
        color: var(--color-primary-hover) !important;
    }
	.nav-container a:hover,
	a.active {
		color: var(--color-primary) !important;
	}
</style>
