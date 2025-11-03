<script lang="ts">
	interface infoType {
		eng: string;
		mal: string;
	}
	let { statusCode } = $props();

	function setInfo(statusCode: number): infoType {
		switch (statusCode) {
			case 0:
				return {
					eng: 'Press Ready when u ready!!',
					mal: 'ഒന്നും നോക്കണ്ട നേരെ റെഡി അമർത്തിക്കോ<br/>ഇതൊക്കെ ഒരു വിശ്വാസല്ലേ !'
				};
			case 119:
				console.log('Getting location');
				return { eng: 'Getting your position', mal: 'ഇത് എവിടെയാണ്...' };

			case 120:
				console.log('Did not get location');
				return {
					eng: "Couldn't get you position.<br/>Maybe reload and try again?.",
					mal: 'കിട്ടിയില്ലലോ, ലൊക്കേഷൻ ഒക്കെ ഓൺ അല്ലെ?'
				};
			default:
				return { eng: '', mal: '' };
		}
	}

	//info is derived from the function setInfo using statusCode
	const info: infoType = $derived(setInfo(statusCode));
</script>

<!-- @html tag identified the html tag in the string and render it as html -->
<p class=" text-center font-comfortaa text-sm font-semibold text-sky-50 md:text-lg">
	{@html info.eng}
</p>
<p class="text-center font-baloo text-sm font-semibold text-sky-50 md:text-lg">{@html info.mal}</p>
