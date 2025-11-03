<script>
	let { icao24, callsign, lon, lat, altitude_m, velocity_ms, distance } = $props();
	console.log('props', icao24, callsign);
	let planeName = $derived(callsign);
</script>

<div class="flex flex-row items-center justify-between bg-sky-50">
	<p>Plane: {planeName}</p>
	<p>Distance: {distance}</p>
</div>
