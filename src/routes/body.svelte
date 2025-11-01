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
	<div
		class="flex min-h-90 items-center justify-center bg-[url(src/lib/assets/VCompass/dial_white.png)] bg-contain bg-center bg-no-repeat"
	>
		<img
			class="h-auto w-2/4"
			class:animate-spin={isSpinning}
			style="transform: rotate({angle}deg)"
			src="src/lib/assets/VCompass/plane_white.png"
			alt="compass"
		/>
	</div>
	<!-- <img class="h-auto w-3/4" src="src/lib/assets/VCompass/dial_white.png" alt="compass" /> -->
	<button class="rounded-2xl bg-sky-900 px-4 py-3.5 text-lime-500 shadow-md" onclick={trackplane}>
		Be Happy!
	</button>
</div>
