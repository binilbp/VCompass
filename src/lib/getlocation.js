export function getLocation(latitude, longitude, error) {
	navigator.geolocation.getCurrentPosition(
		// Success callback
		(position) => {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
		},
		// Error callback
		(err) => {
			switch (err.code) {
				case err.PERMISSION_DENIED:
					error = 'User denied the request for Geolocation.';
					break;
				case err.POSITION_UNAVAILABLE:
					error = 'Location information is unavailable.';
					break;
				case err.TIMEOUT:
					error = 'The request to get user location timed out.';
					break;
				default:
					error = 'An unknown error occurred.';
			}
		}
	);
}
