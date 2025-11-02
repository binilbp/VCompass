<script>
	import whitedial from '$lib/assets/dial_white.png';
	import whiteplane from '$lib/assets/plane_white.png';
	let angle = $state(0);
	let isSpinning = $state(false);
	let trackingPlane = $state(false);
	let gettingLocation = $state(0);
	let planefound = false; //Plane found
	let currentLat = null; //Latitude
	let currentLong = null; //Longitude
	let planes = { undefined }; // plane details
	let timerID = null; //used to stop the function settimer
	let error;

	function rotate() {
		angle += 1;
	}

	function fetchPlanes() {
		fetchPlanesAPI();
		if (planefound) {
			console.log('Planes found! Next fetch in 20s');
			timerID = setTimeout(fetchPlanes, 20000); //if planes are found next run after 20s
		} else {
			console.log('No plane found! Next fetch in 10s');
			timerID = setTimeout(fetchPlanes, 10000); // else run after 10s
		}
	}
	async function fetchPlanesAPI() {
		error = null;
		console.log(`Fetching planes for: ${currentLat}, ${currentLong}`);
		const apiUrl = `http://127.0.0.1:8000/api/planes?lat=${currentLat}&lon=${currentLong}`;

		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error(`API request failed with status ${response.status}`);
			}
			const data = await response.json();
			if (data === null) {
				planefound = false;
				console.log('Received none');
			} else {
				planefound = true;
				planes = data;
				console.log('Received data', planes);
			}
		} catch (err) {
			error = `Failed to fetch planes: ${err.message}`;
			console.error(err);
		}
	}

	function locationSuccess(position) {
		currentLat = position.coords.latitude;
		currentLong = position.coords.longitude;
		console.log('Got the location:', currentLat, currentLong);

		//change visual info to Got your location from Getting location
		gettingLocation = 1;
		//start API loop
		fetchPlanes();
	}

	function locationError(err) {
		gettingLocation = -1;
		trackingPlane = false;
		isSpinning = false;
		switch (err.code) {
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
				console.log('Undefined error occured');
		}
	}

	//main function
	function trackplane() {
		//set start of tracking plane
		trackingPlane = !trackingPlane;
		//isSpinning is used to control the plane dial spin; initally turn on spinning
		isSpinning = trackingPlane;
		if (trackingPlane) {
			console.log('Tracking Started');
			console.log('Getting Location');
			// navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
			// 	enableHighAccuracy: true
			// });
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
			//if we get the location, locationSuccess function would then start the API loop
			//else locationError would execute
		} else {
			//no tracking so we immediately stop any current tracking
			clearTimeout(timerID);
		}
	}
</script>

<div class="flex flex-col items-center justify-start gap-8 p-5">
	<div class="grid place-items-center">
		<img
			class="z-20 col-start-1 row-start-1 h-auto w-2/4"
			style="transform: rotate({angle}deg)"
			src={whiteplane}
			alt="white colored plane"
		/>
		<img
			class="z-10 col-start-1 row-start-1 max-h-80"
			class:animate-[spin_8s_linear_infinite]={isSpinning}
			src={whitedial}
			alt="white compass dial"
		/>
	</div>
	<button
		class="rounded-2xl bg-sky-900 px-4 py-3.5 font-boogaloo text-lime-500 shadow-md"
		onclick={trackplane}
	>
		Be Happy!
	</button>

	<!-- display info about current procedure -->
	{#if trackingPlane && gettingLocation === 0}
		<p class="font-boogaloo text-2xl text-blue-50">Getting your position</p>
	{:else if trackingPlane && gettingLocation === 1}
		<p class="text-center font-boogaloo text-2xl text-blue-50">
			Got your location {currentLat}{currentLong} <br />Searching your sky!
		</p>
	{:else if gettingLocation === -1}
		<p class="font-boogaloo text-2xl text-blue-50">
			Couldnt get your position :( !<br />Maybe reload and try again ?
		</p>
	{/if}
</div>
