export function getPositionCords() {
	// Return a Promise object
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				// Success function calls resolve()
				(position) => {
					const coords = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					};
					resolve(coords); // The 'return value' of the Promise
				},
				// Error function calls reject()
				(error) => {
					reject(error);
				}
			);
		} else {
			reject(new Error('Geolocation is not supported by this browser.'));
		}
	});
}
