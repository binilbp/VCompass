<script>
	let angle = $state(0);
	let isSpinning = $state(false);
	let trackingPlane = $state(false);
	let gettingLocation = $state(0);
	let planefound = false;
	let currentLat = null;
	let currentLong = null;

	function rotate() {
		angle += 1;
	}

	function trackplane() {
		isSpinning = !isSpinning;
		trackingPlane = !trackingPlane;
		navigator.geolocation.getCurrentPosition(setPosition, locationError);
	}

	function setPosition(position) {
		currentLat = position.coords.latitude;
		currentLong = position.coords.longitude;
		console.log('Got the location:', currentLat, currentLong);
		gettingLocation = 1;
	}

	function locationError(err) {
		gettingLocation = -1;
		switch (err) {
			case err.PERMISSION_DENIED:
				console.log('User denied the request for Geolocation.');
				break;
			case err.POSITION_UNAVAILABLE:
				console.log('Location information is unavailable.');
				break;
			case err.TIMEOUT:
				console.log('The request to get user location timed out.');
				break;
			default:
				console.log('An unknown error occurred.');
		}
	}
</script>

<div class="flex flex-col items-center justify-start gap-8 p-5">
	<div class="grid place-items-center">
		<img
			class="z-20 col-start-1 row-start-1 h-auto w-2/4"
			style="transform: rotate({angle}deg)"
			src="src/lib/assets/VCompass/plane_white.png"
			alt="white colored plane"
		/>
		<img
			class="z-10 col-start-1 row-start-1 max-h-80"
			class:animate-[spin_8s_linear_infinite]={isSpinning}
			src="src/lib/assets/VCompass/dial_white.png"
			alt="white dials of compass"
		/>
	</div>
	<button
		class="rounded-2xl bg-sky-900 px-4 py-3.5 font-boogaloo text-lime-500 shadow-md"
		onclick={trackplane}
	>
		Be Happy!
	</button>

	{#if trackingPlane && gettingLocation === 0}
		<p class="font-boogaloo text-blue-50">Getting your location</p>
	{:else if trackingPlane && gettingLocation === 1}
		<p class="text-center font-boogaloo text-blue-50">
			Got your location<br />Searching the sky near you!
		</p>
	{:else if gettingLocation === -1}
		<p class="font-boogaloo text-blue-50">Did not get your location !</p>
	{/if}
</div>
