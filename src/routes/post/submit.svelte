<script type="typescript">
	import Button from '../../components/button/index.svelte';
	import { mainStore } from '../../stores/main';
	let submitBtnDisabled = false;
	let titleTxt: string = '',
		contentTxt: string = '';

	$: if (titleTxt.length < 5 || contentTxt.length < 5) {
		submitBtnDisabled = true;
	} else {
		submitBtnDisabled = false;
	}

	const submitPost = async () => {
		let post = {
			title: titleTxt,
			content: contentTxt,
			desc: contentTxt,
			username: 'toxwak'
		};
		let url = $mainStore.baseUrl + '/api/post/new';
		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		});
		let resJson = await res.json();
		if (resJson.success) {
			alert('Post submitted successfully!');
		} else {
			alert('Failed to submit post');
		}
	};
</script>

<div class="submit-post-container">
	<div class="form-group">
		<label for="title">Title</label>
		<input bind:value={titleTxt} type="text" id="title" placeholder="Title" />
	</div>
	<div class="form-group">
		<label for="content">Content</label>
		<textarea
			bind:value={contentTxt}
			placeholder="Conetent"
			id="content"
			rows="3"
		/>
	</div>
	<Button
		on:click={submitPost}
		type="submit"
		disabled={submitBtnDisabled}
		class="btn btn-primary mt-4">Submit</Button
	>
</div>