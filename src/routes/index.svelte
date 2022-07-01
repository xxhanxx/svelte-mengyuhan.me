<script context="module">
	import { pageNameStore } from '../stores/pageName';
    pageNameStore.set('About');

</script>

<script type="typescript">
	pageNameStore.set('About');
</script>

<svelte:head>
	<title>About - mengyuhan.me</title>
</svelte:head>
<div>
	<p>Hi! I'm han. A 19 yo fullstack web developer from China.</p>
	<p class="mt-4">Here are some projects that coding by me:</p>
	<p>
		<a target="_blank" href="https://www.yuansu.app">yuansu.app</a> - A shadowsocks users manage
		portal powered by <a target="_blank" href="https://vuejs.org">vue.js</a>.
	</p>
	<p>
		<a target="_blank" href="https://www.yuhan.tv">yuhan.tv</a> - An online streaming platform
		powered by <a target="_blank" href="https://nuxtjs.org">nuxt.js</a>.
	</p>
	<p>
		and this website is powerd by <a target="_blank" href="https://kit.svelte.dev">sveltekit</a>.
	</p>
	<p class="mt-4">
		contact me: <a target="_blank" href="https://t.me/sleeeepydude">t.me/sleeeepydude</a>
	</p>
</div>
