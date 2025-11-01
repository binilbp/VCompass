<script>
	let angle = $state(0);
	let isSpinning = $state(false);
	let planefound = false;

	function rotate() {
		angle += 1;
	}

	function trackplane() {
		isSpinning = !isSpinning;
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
	<!-- <img class="h-auto w-3/4" src="src/lib/assets/VCompass/dial_white.png" alt="compass" /> -->
	<button
		class="rounded-2xl bg-sky-900 px-4 py-3.5 font-boogaloo text-lime-500 shadow-md"
		onclick={trackplane}
	>
		Be Happy!
	</button>
</div>
