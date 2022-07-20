<script type="typescript">
	let headerTitle: string = 'MENGYUHAN.ME';
	import Nav from '../components/nav.svelte';
	import Footer from '../components/footer.svelte';
	import BackToTop from '../components/backToTop.svelte';
	import '../css/global.css';

	let showOnPx = 200;
	let hidden = true;
	function handleOnScroll() {
		if (!document.documentElement) return;
		hidden = document.documentElement.scrollTop <= showOnPx;
	}
</script>

<svelte:window on:scroll={handleOnScroll} />

<main class="max-w-4xl w-full mx-auto p-4">
	<img class="profile_pic shadow" src="/pic.jpg" alt="pic" />
	<h1 class="text-3xl uppercase mt-4 mb-6 tracking-wider">{headerTitle}</h1>
	<Nav />
	<div class="content">
		<slot />
	</div>
	<Footer />
	<BackToTop {hidden} />
</main>

<style>
	main {
		margin-top: 6vh;
		font-family: 'Poppins', sans-serif;
	}

	.profile_pic {
		border-radius: 50%;
		max-width: 50px;
	}
	.content {
		min-height: calc(94vh - 260px);
		padding: 20px 0;
	}
</style>
