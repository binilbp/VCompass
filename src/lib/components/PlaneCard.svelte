<script lang="ts">
	interface propsType {
		planeName: string;
		planeDistance: number;
		planeAngle: number;
		isTrackingPlane: boolean;
	}

	import { playPlaneDirection } from '$lib/functions/playPlaneDirection';
	let { planeName, planeDistance, planeAngle, isTrackingPlane }: propsType = $props();
	console.log('display info on plane', planeName, '@', planeDistance);
	// let planeName = $derived(callsign);

	function playDirectionSound() {
		playPlaneDirection(planeAngle, isTrackingPlane);
	}
</script>

<div
	class="flex flex-row gap-5 rounded-2xl bg-sky-50 px-6 py-3 font-sans font-semibold text-sky-950 shadow-sm"
>
	<p class="px-4 py-2.5 font-comfortaa font-semibold text-sky-900">
		PLANE: {planeName} <br />DIST: {planeDistance}km
	</p>
	<button
		class="rounded-2xl bg-sky-900 px-3 font-comfortaa text-sm font-semibold text-lime-500 shadow-md"
		onclick={playDirectionSound}
	>
		I cant see!!
	</button>
</div>
