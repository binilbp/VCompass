import arfanodraa from '$lib/assets/audio/arfan-odraa.mp3';

export function playPlaneFound() {
	//prevent audio rendering by ssr
	if (typeof Window === undefined) return;

	const arfanOdraa = new Audio(arfanodraa);
	arfanOdraa.currentTime = 0;
	arfanOdraa.play();
}
