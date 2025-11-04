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
			case 125:
				console.log('Got location');
				return {
					eng: 'Got your position',
					mal: 'ഓക്കേ സെറ്റ്, സാനം കിട്ടി'
				};
			case 131:
				console.log('Cant Connect to Backend');
				return {
					eng: 'Sorry! Backend Issues.Try Later',
					mal: 'ശേ !! പണി കിട്ടി ബ്രോ, കണക്ട് ആവണില്ല.<br />കുറച്ക്കഴിഞ്ഞു വാ, സെറ്റ് ആക്കാം'
				};
			case 135:
				console.log('Plane @ north');
				return {
					eng: 'Look North now!',
					mal: 'വടക്ക് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 136:
				console.log('Plane @ north-east');
				return {
					eng: 'Look NorthEast now!',
					mal: 'വടക്ക് കിഴക്ക് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 137:
				console.log('Plane @ east');
				return {
					eng: 'Look East now!',
					mal: 'കിഴക്ക് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 138:
				console.log('Plane @ south-east');
				return {
					eng: 'Look SouthEast now!',
					mal: 'തെക്ക് കിഴക്ക് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 139:
				console.log('Plane @ south');
				return {
					eng: 'Look South now!',
					mal: 'തെക്ക് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 140:
				console.log('Plane @ south-west');
				return {
					eng: 'Look SouthWest now!',
					mal: 'തെക്ക് പടിഞ്ഞാറ് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 141:
				console.log('Plane @ west');
				return {
					eng: 'Look West now!',
					mal: 'പടിഞ്ഞാറ് പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
				};
			case 142:
				console.log('Plane @ north-west');
				return {
					eng: 'Look NorthWest now!',
					mal: 'വടക്ക് പടിഞ്ഞാറ്  പ്ലെയിൻ പോവിണ്ട് ഇപ്പൊ!'
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
