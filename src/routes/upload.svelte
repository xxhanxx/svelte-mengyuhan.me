<script context="module">
	import { pageNameStore } from '../stores/pageName';
	pageNameStore.set('Upload');
	export async function load() {
		let serverOptions = ['qiniu', 'tencent'];
		// migrate to nodejs backend in the future
		const url = 'https://api.mengyuhan.me:10201/v1/upload/getBuckets?cdn=' + serverOptions[0];
		const res = await fetch(url);
		const buckets = await res.json();
		return {
			props: { buckets: buckets.data, serverOptions }
		};
	}
</script>

<script type="typescript">
	import { Base64 } from 'js-base64';
	import Button from '../components/button/index.svelte';
	import Selector from '../components/selector/index.svelte';
	import type { UploadDetails } from '../interfaces/upload.interface';
	import FileUploader from '../fileUploader';

	pageNameStore.set('Upload');
	export let serverOptions: Array<string> = ['qiniu', 'tencent'],
		buckets: Array<string> = [];

	let authCodeTxt: string = '',
		selectedServersTxt: string = '',
		selectedBucketTxt: string = '',
		errorTxt: string = '';

	let fileDetails: { file?: File; fileName: string; fileExt: string; fileSize: number } = {
		fileName: '',
		fileExt: '',
		fileSize: 0
	};

	let isUploading: boolean = false,
		progressPercent: number = 0,
		successedUpload: boolean = false,
		successedUrl: string = '';

	$: selectedServersTxt && getBuckets();
	$: if (authCodeTxt) {
		errorTxt = '';
	}

	function getBuckets(): void {
		// migrate to nodejs backend in the future
		fetch('https://api.mengyuhan.me:10201/v1/upload/getBuckets?cdn=' + selectedServersTxt)
			.then((res) => res.json())
			.then((res) => {
				buckets = res.data;
				selectedBucketTxt = buckets[0];
			});
	}

	function fileChangedHandler(e: Event): void {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) {
			return;
		}
		const file = input.files[0];
		let lastDot = file.name.lastIndexOf('.');
		let fileName = file.name.substring(0, lastDot);
		let fileExt = file.name.substring(lastDot + 1);
		fileDetails = {
			file,
			fileName,
			fileExt,
			fileSize: file.size
		};
	}

	function initUpload() {
		isUploading = false;
		progressPercent = 0;
		successedUpload = false;
		successedUrl = '';
		uploadFile();
	}

	async function uploadFile() {
		if (!fileDetails.file || isUploading) return;

		let uploadDetails: UploadDetails = await getUploadDetails();
		if (!uploadDetails.token) {
			errorTxt = 'Get upload token failed, please check if your authroization code is correct.';
			return;
		}

		isUploading = true;
		uploadDetails.baseObjectName = Base64.encode(uploadDetails.key);
		uploadDetails.size = fileDetails.fileSize;
		uploadDetails.method = selectedServersTxt === 'qiniu' ? 0 : 1;

		function progressHandler(percent: number): void {
			progressPercent = percent;
		}
		function finishedHandler(url: string): void {
			successedUrl = url;
			successedUpload = true;
			isUploading = false;
			fileDetails = {
				file: undefined,
				fileName: '',
				fileExt: '',
				fileSize: 0
			};
		}

		const fileUploader = new FileUploader(
			fileDetails.file!,
			uploadDetails,
			20,
			progressHandler,
			finishedHandler
		);
		fileUploader.begin();

		// if (uploadDetails.method === 0) {
		// 	videoUploader.uploadQiniu();
		// } else if (uploadDetails.method === 1) {
		// 	await videoUploader.uploadQcloud();
		// }
	}

	async function getUploadDetails(): Promise<UploadDetails> {
		const url = `https://api.mengyuhan.me:10201/v1/upload/getXhsToken?code=${authCodeTxt}&cdn=${selectedServersTxt}&bucket=${selectedBucketTxt}&ext=${fileDetails.fileExt}&name=${fileDetails.fileName}`;
		const res = await fetch(url);
		const token = await res.json();
		return token;
	}
</script>

<div class="upload">
	{#if !successedUpload}
		<div class="form-group">
			<label for="title">Authorization code</label>
			<input bind:value={authCodeTxt} type="text" id="authCode" placeholder="Authorization code" />
		</div>
		{#if serverOptions}
			<div class="form-group">
				<label for="title">Servers</label>
				<Selector bind:value={selectedServersTxt} data={serverOptions} />
			</div>
		{/if}

		{#if buckets}
			<div class="form-group">
				<label for="title">Buckets</label>
				<Selector bind:value={selectedBucketTxt} data={buckets} />
			</div>
		{/if}

		{#if selectedServersTxt === 'tencent'}
			<div class="form-group">
				<label for="title">File name</label>
				<input
					bind:value={fileDetails.fileName}
					type="text"
					id="fileName"
					placeholder="File name"
				/>
			</div>
			<div class="form-group">
				<label for="title">File extension</label>
				<input
					bind:value={fileDetails.fileExt}
					type="text"
					id="fileExt"
					placeholder="File extension"
				/>
			</div>
		{/if}

		{#if errorTxt}
			<p class="error-msg my-4 text-red-400">
				{errorTxt}
			</p>
		{/if}

		<div class="btns mt-6 flex">
			<Button
				disabled={isUploading}
				outlined
				on:change={(e) => {
					fileChangedHandler(e);
				}}
				file>Choose a File</Button
			>

			<Button disabled={!fileDetails.file} icon class="ml-4" on:click={initUpload}>
				<div class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
					</svg>
				</div>
				{#if !isUploading}
					<span>Upload</span>
				{:else}
					<span>{progressPercent} %</span>
				{/if}
			</Button>
		</div>
	{:else}
		<p class="text-xl">Upload successfully!</p>
		<p class="text-xl break-all">
			Here's your Url: <a href={successedUrl} target="_blank">{successedUrl}</a>
		</p>
		<Button
			on:click={() => {
				successedUpload = false;
				successedUrl = '';
			}}
			class="mt-6"
		>
			Return
		</Button>
	{/if}
</div>
