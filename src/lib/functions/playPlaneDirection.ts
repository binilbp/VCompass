import arunanorth from '$lib/assets/audio/aruna-north.mp3';
import arunaeast from '$lib/assets/audio/aruna-east.mp3';
import arunawest from '$lib/assets/audio/aruna-west.mp3';
import arunasouth from '$lib/assets/audio/aruna-south.mp3';
import fadilnortheast from '$lib/assets/audio/fadil-north-east.mp3';
import fadilnorthwest from '$lib/assets/audio/fadil-north-west.mp3';
import fadilsoutheast from '$lib/assets/audio/fadil-south-east.mp3';
import fadilsouthwest from '$lib/assets/audio/fadil-south-west.mp3';

export function playPlaneDirection(angle: number, isTracking: boolean) {
	//prevent rendering the audio by ssr
	if (typeof Window === undefined) return;

	if ((angle >= 337.5 && angle < 0) || (angle >= 0 && angle < 22.5)) {
		const arunaNorth = new Audio(arunanorth);
		arunaNorth.currentTime = 0;
		arunaNorth.play();
	}

	if (angle >= 22.5 && angle < 67.5) {
		const fadilNortheast = new Audio(fadilnortheast);
		fadilNortheast.currentTime = 0;
		fadilNortheast.play();
	}

	if (angle >= 67.5 && angle < 112.5) {
		const arunaEast = new Audio(arunaeast);
		arunaEast.currentTime = 0;
		arunaEast.play();
	}

	if (angle >= 112.5 && angle < 157.5) {
		const fadilSoutheast = new Audio(fadilsoutheast);
		fadilSoutheast.currentTime = 0;
		fadilSoutheast.play();
	}

	if (angle >= 157.5 && angle < 202.5) {
		const arunaSouth = new Audio(arunasouth);
		arunaSouth.currentTime = 0;
		arunaSouth.play();
	}

	if (angle >= 202.5 && angle < 247.5) {
		const fadilSouthwest = new Audio(fadilsouthwest);
		fadilSouthwest.currentTime = 0;
		fadilSouthwest.play();
	}

	if (angle >= 247.5 && angle < 292.5) {
		const arunaWest = new Audio(arunawest);
		arunaWest.currentTime = 0;
		arunaWest.play();
	}

	if (angle >= 292.5 && angle < 337.5) {
		const fadilNorthwest = new Audio(fadilnorthwest);
		fadilNorthwest.currentTime = 0;
		fadilNorthwest.play();
	}
}
