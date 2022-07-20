<script type="typescript">
	import { mainStore } from '../../stores/main';
	import Button from '../../components/button/index.svelte';
	import Selector from '../../components/selector/index.svelte';
	let postFlag: boolean,
		authCodeTxt: string,
		urlTxt: string,
		selectedResourceTypeTxt: string,
		descriptionTxt: string;
	let typeOptions = ['Image', 'Video'];

	const submit = async () => {
		if (postFlag) return;
		postFlag = true;
		let post = {
			code: authCodeTxt,
			url: urlTxt,
			type: selectedResourceTypeTxt,
			description: descriptionTxt
		};
		let url = $mainStore.baseUrl + '/api/gallery/new';
		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		});
		let resJson = await res.json();
		if (resJson.success) {
			alert('Submitted successfully!');
		} else {
			alert(resJson.message);
		}

		postFlag = false;
	};
</script>

<div>
	<div class="form-group">
		<label for="title">Authorization code</label>
		<input bind:value={authCodeTxt} type="text" id="authCode" placeholder="Authorization code" />
	</div>
	<div class="form-group">
		<label for="title">Resource url</label>
		<input bind:value={urlTxt} type="text" id="url" placeholder="Resource url" />
	</div>
	<div class="form-group">
		<label for="title">Resource type</label>
		<Selector bind:value={selectedResourceTypeTxt} data={typeOptions} />
	</div>

	<div class="form-group">
		<label for="title">Description</label>
		<textarea bind:value={descriptionTxt} type="text" id="description" placeholder="Description" />
	</div>
	<div class="btns mt-6">
		<Button disabled={postFlag} on:click={submit}>Submit</Button>
	</div>
</div>
