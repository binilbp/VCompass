<script lang="ts">
	import whitedial from '$lib/assets/dial_white.svg';
	import whiteplane from '$lib/assets/plane_white.png';
	import nsewdial from '$lib/assets/nsew_dial.svg';
	import { playSound } from '$lib/playSound.js';
	import { calculateAngle } from '$lib/calculateAngle.js';
	import PlaneCard from '$lib/PlaneCard.svelte';

	//top level control variable
	let isTrackingPlane: boolean = $state(false);
	//spin animation control variable
	let isSpinning: boolean = $derived(isTrackingPlane);
	//white plane angle control variable
	let planeAngle: number = $state(0);

	function rotatePlane(angle: number) {
		//this function set the angle of the white plane
		planeAngle = angle;
	}

	function trackPlane() {
		isTrackingPlane = !isTrackingPlane;
	}
</script>

<div class="flex flex-col items-center justify-start gap-8 p-5">
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
	<button class="rounded-2xl bg-sky-900 px-4 py-3.5 text-lime-500 shadow-md" onclick={trackPlane}>
		Ready
	</button>
</div>
