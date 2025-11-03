<script lang="ts">
	//assets imported
	import whitedial from '$lib/assets/dial_white.svg';
	import whiteplane from '$lib/assets/plane_white.png';
	import nsewdial from '$lib/assets/nsew_dial.svg';

	// functions imported
	import { getPositionCords } from '$lib/functions/getPositionCords.js';
	import { getPlane } from '$lib/functions/getPlane';
	// import { playSound } from '$lib/playSound.js';
	// import { calculateAngle } from '$lib/calculateAngle.js';

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
	let timerID: number;

	function rotatePlane(angle: number) {
		//this function set the angle of the white plane
		planeAngle = angle;
	}

	async function startEngine() {
		let planeData = undefined;
		//simple function to stop this function here if isTrackingPlane is false
		if (!isTrackingPlane) return;

		//try to connect to backend using getPlane
		try {
			planeData = await getPlane(userLatitude, userLongitude);
		} catch (error: any) {
			console.log('Backend Issue');
			statusCode = 131;
			isTrackingPlane = false;
		}

		if (planeData === undefined && isTrackingPlane === true) {
			console.log('No plane data received,next try in 15s ');
			timerID = setTimeout(startEngine, 15000);
		} else if (planeData !== undefined && isTrackingPlane === true) {
			console.log('Got plane data, next try in 25s');
			console.log('PlaneData:', planeData);
			timerID = setTimeout(startEngine, 25000);
		} else {
			console.log('Stopping Engine');
			//clear exiting timers
			clearTimeout(timerID);
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
				userLongitude = location.latitude;
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
				startEngine();
			}
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
		<button
			class="rounded-2xl bg-sky-900 px-4 py-3.5 font-comfortaa font-semibold text-lime-500 shadow-md"
			onclick={trackPlane}
		>
			Ready
		</button>
	</div>
	<div class="flex flex-col items-center justify-start px-5 py-2 md:w-120 md:pt-30">
		<InfoBar {statusCode} />
	</div>
</div>
