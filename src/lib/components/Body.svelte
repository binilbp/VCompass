<script lang="ts">
	//assets imported
	import whitedial from '$lib/assets/dial_white.svg';
	import whiteplane from '$lib/assets/plane_white.png';
	import nsewdial from '$lib/assets/nsew_dial.svg';

	// functions imported
	import { getPositionCords } from '$lib/functions/getPositionCords';
	import { getPlane } from '$lib/functions/getPlane';
	import { playPlaneFound } from '$lib/functions/playPlaneFound';
	import { getStatusCode } from '$lib/functions/getStatusCode';
	import { calculateAngle } from '$lib/functions/calculateAngle';

	// components imported
	import InfoBar from '$lib/components/InfoBar.svelte';
	import PlaneCard from '$lib/components/PlaneCard.svelte';

	// top level control variable
	let isTrackingPlane: boolean = $state(false);
	// spin animation control variable
	let isSpinning: boolean = $derived(isTrackingPlane);
	// white plane angle control variable
	let planeAngle: number = $state(0);
	// whole program current status and also used to show info
	let statusCode: number = $state(0);
	// global variables storing latitude and longitude of user
	let userLatitude: number;
	let userLongitude: number;
	// store the timer we set, this can also be used to clear the timers when needed
	let timerID: number = 0;
	// consecutive times we got no data back
	let noDataCount: number = $state(3);
	//to store and compare plane name
	let planeName: string = '';
	//to store plane data for plane card
	let planeCardData: any = $state({});

	function handlePlaneData(data: any, gotData: boolean) {
		//just two make sure no paralled timer is running
		if (timerID > 0) clearTimeout(timerID);
		if (!gotData) {
			console.log('Set 10s timer for next plane call');
			timerID = setInterval(startPlaneCall, 10000);

			//increment noDataCount for long wait special info
			noDataCount++;
			if (noDataCount >= 2) statusCode = 126;
			if (noDataCount == 5) {
				statusCode = 127;
				isTrackingPlane = false;
			}
		} else {
			console.log('Set 25s timer for next plane call');
			timerID = setTimeout(startPlaneCall, 25000);

			//get angle to set the white plane
			const angle = calculateAngle(userLatitude, userLongitude, data.lat, data.lon);
			//set the white plane angle
			planeAngle = angle;

			const planeDistance = data.distance;

			if (planeName != data.callsign) {
				//set plane name and play sound if new name
				planeName = data.callsign;
				planeCardData = { planeName, planeDistance, planeAngle, isTrackingPlane };
				playPlaneFound();
			}

			//set info
			statusCode = getStatusCode(angle);
			//set data count to 0 incase it was incremented
			if (noDataCount > 0) noDataCount = 0;
		}
	}

	async function startPlaneCall() {
		let planeData = undefined;

		//simple check to stop this function here, if isTrackingPlane is false
		if (!isTrackingPlane) return;

		//try to connect to backend using getPlane
		try {
			planeData = await getPlane(userLatitude, userLongitude);
		} catch (error: any) {
			console.log('Backend Issue:', error);
			statusCode = 131;
			isTrackingPlane = false;
		}

		if (planeData === null && isTrackingPlane === true) {
			console.log('No plane data');

			//false indicating we did not get data
			handlePlaneData(planeData, false);
		} else if (planeData != null && isTrackingPlane === true) {
			console.log('Got plane data');
			console.log('PlaneData:', planeData);

			//true indicating we got data
			handlePlaneData(planeData, true);
		} else {
			console.log('Stopping PlaneCall');

			//clear exiting timers if any exists
			if (timerID != 0) {
				clearTimeout(timerID);
				console.log('Cleared existing timer');
			} else {
				console.log('No timer to clear');
			}
		}
	}

	async function trackPlane() {
		isTrackingPlane = !isTrackingPlane;

		//if illel off cheyumbolum on cheyumbolum startEngine run aavum
		if (isTrackingPlane) {
			statusCode = 119;
			// try getting location
			try {
				const location = await getPositionCords();

				userLatitude = location.latitude;
				userLongitude = location.longitude;
				statusCode = 125;
				console.log('Location :', userLatitude, userLongitude);
			} catch (error: any) {
				console.error('Error retrieving location:', error.message);
				statusCode = 120;
				//stop TrackingPlane
				isTrackingPlane = false;
			}
			//continue to start the main enginge if stil isTrackingPlane
			if (isTrackingPlane) {
				startPlaneCall();
			}
		} else {
			console.log('Tracking Stopped');
			console.log('Clearing any exising timers');

			if (timerID > 0) clearTimeout(timerID);
			planeAngle = 0;
		}
	}
</script>

<div class="flex flex-col items-center justify-start md:flex-row md:items-start md:justify-around">
	<div class="flex flex-col items-center justify-start gap-8 p-5 md:flex-row md:justify-between">
		<div class="grid place-items-center">
			<img
				class="z-30 col-start-1 row-start-1 h-auto w-2/4 transition-transform duration-1000"
				style="transform: rotate({planeAngle}deg)"
				src={whiteplane}
				alt="white colored plane"
			/>
			<img
				class="z-20 col-start-1 row-start-1 max-h-80"
				class:animate-[spin_8s_linear_infinite]={isSpinning}
				src={whitedial}
				alt="white compass dial"
			/>
			<img class="z-10 col-start-1 row-start-1 max-h-80" src={nsewdial} alt="white compass dial" />
		</div>
		{#if noDataCount == 5}
			<button
				class="rounded-2xl bg-sky-900 px-4 py-3.5 font-comfortaa font-semibold text-lime-500 shadow-md"
				onclick={() => {
					statusCode = 129;
					noDataCount = 0;
				}}
			>
				Now What?
			</button>
		{/if}
		{#if noDataCount < 5}
			<button
				class="rounded-2xl bg-sky-900 px-4 py-3.5 font-comfortaa font-semibold text-lime-500 shadow-md"
				onclick={trackPlane}
			>
				Ready
			</button>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-start gap-4 px-5 py-2 md:w-120 md:gap-2 md:pt-30">
		<InfoBar {statusCode} />

		<!-- only render planecard if statusCode >=135, that is plane found -->
		{#if statusCode >= 135}
			<PlaneCard {...planeCardData} />
		{/if}
	</div>
</div>
