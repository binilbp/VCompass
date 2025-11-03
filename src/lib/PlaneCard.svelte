<script>
	import { playSound } from './playSound';
	let { pangle, icao24, callsign, lon, lat, altitude_m, velocity_ms, distance } = $props();
	console.log('display info on plane', callsign, '@', distance);
	let planeName = $derived(callsign);
</script>

<div
	class="flex flex-row gap-5 rounded-2xl bg-sky-50 px-6 py-3 font-sans font-semibold text-sky-950 shadow-sm"
>
	<p>plane {planeName} now at distance {distance}km</p>
	<!-- <button onclick={playSound(pangle, 1)}> I cant see!! </button> -->
</div>
