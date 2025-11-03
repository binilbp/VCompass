<script lang="ts">
	//assets imported
	import whitedial from '$lib/assets/dial_white.svg';
	import whiteplane from '$lib/assets/plane_white.png';
	import nsewdial from '$lib/assets/nsew_dial.svg';

	// functions imported
	import { getPositionCords } from '$lib/functions/getPositionCords.js';
	// import { playSound } from '$lib/playSound.js';
	// import { calculateAngle } from '$lib/calculateAngle.js';

	//components imported
	import InfoBar from '$lib/components/InfoBar.svelte';
	import PlaneCard from '$lib/components/PlaneCard.svelte';

	//top level control variable
	let isTrackingPlane: boolean = $state(false);
	//spin animation control variable
	let isSpinning: boolean = $derived(isTrackingPlane);
	//white plane angle control variable
	let planeAngle: number = $state(0);
	let statusCode: number = $state(0);

	function rotatePlane(angle: number) {
		//this function set the angle of the white plane
		planeAngle = angle;
	}

	async function startEngine() {
		//primary task is to get location
		statusCode = 119;
		try {
			const location = await getPositionCords();
			const userLatitude = location.latitude;
			const userLongitude = location.latitude;
			console.log('Got user location :', userLatitude, userLongitude);
		} catch (error: any) {
			console.error('Error retrieving location:', error.message);
			statusCode = 120;
			isTrackingPlane = false;
		}
	}
	function trackPlane() {
		isTrackingPlane = !isTrackingPlane;
		//if illel off cheyumbolum on cheyumbolum startEngine run aavum
		if (isTrackingPlane) {
			startEngine();
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
	<div class="flex flex-col items-center justify-start px-5 py-2 md:px-24 md:pt-30">
		<InfoBar {statusCode} />
	</div>
</div>
