import arfanodraa from '$lib/assets/audio/arfan-odraa.mp3';
import arunanorth from '$lib/assets/audio/aruna-north.mp3';
import arunaeast from '$lib/assets/audio/aruna-east.mp3';
import arunawest from '$lib/assets/audio/aruna-west.mp3';
import arunasouth from '$lib/assets/audio/aruna-south.mp3';
import fadilnortheast from '$lib/assets/audio/fadil-north-east.mp3';
import fadilnorthwest from '$lib/assets/audio/fadil-north-west.mp3';
import fadilsoutheast from '$lib/assets/audio/fadil-south-east.mp3';
import fadilsouthwest from '$lib/assets/audio/fadil-south-west.mp3';

export function playSound(angle, firstCall = 0) {
	const arfanOdraa = new Audio(arfanodraa);
	if (firstCall) arfanOdraa.play();

	const arunaNorth = new Audio(arunanorth);
	const arunaEast = new Audio(arunaeast);
	const arunaWest = new Audio(arunawest);
	const arunaSouth = new Audio(arunasouth);
	const fadilNortheast = new Audio(fadilnortheast);
	const fadilNorthwest = new Audio(fadilnorthwest);
	const fadilSoutheast = new Audio(fadilsoutheast);
	const fadilSouthwest = new Audio(fadilsouthwest);

	if ((angle >= 337.5 && angle < 0) || (angle >= 0 && angle < 22.5)) {
		arunaNorth.currentTime = 0;
		arunaNorth.play();
	}

	if (angle >= 22.5 && angle < 67.5) {
		fadilNortheast.currentTime = 0;
		fadilNortheast.play();
	}

	if (angle >= 67.5 && angle < 112.5) {
		arunaEast.currentTime = 0;
		arunaEast.play();
	}

	if (angle >= 112.5 && angle < 157.5) {
		fadilSoutheast.currentTime = 0;
		fadilSoutheast.play();
	}

	if (angle >= 157.5 && angle < 202.5) {
		arunaSouth.currentTime = 0;
		arunaSouth.play();
	}

	if (angle >= 202.5 && angle < 247.5) {
		fadilSouthwest.currentTime = 0;
		fadilSouthwest.play();
	}

	if (angle >= 247.5 && angle < 292.5) {
		arunaWest.currentTime = 0;
		arunaWest.play();
	}

	if (angle >= 292.5 && angle < 337.5) {
		fadilNorthwest.currentTime = 0;
		fadilNorthwest.play();
	}
}
