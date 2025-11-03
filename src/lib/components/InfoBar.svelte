<script lang="ts">
	interface infoType {
		eng: string;
		mal: string;
	}
	let { statusCode } = $props();
	console.log('prop:', statusCode);

	function setInfo(statusCode: number): infoType {
		switch (statusCode) {
			case 119:
				console.log('got status 119');
				return { eng: 'Getting your position', mal: 'ഇത് എവിടെയാണ്...' };
			default:
				return { eng: '', mal: '' };
		}
	}

	//info is derived from the function setInfo using statusCode
	const info: infoType = $derived(setInfo(statusCode));
</script>

<p class="font-comfortaa text-sm font-semibold text-sky-50 md:text-lg">{info.eng}</p>
<p class="font-baloo text-sm font-semibold text-sky-50 md:text-lg">{info.mal}</p>
