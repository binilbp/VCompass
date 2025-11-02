function toRad(degrees) {
	return degrees * (Math.PI / 180);
}

export function calculateAngle(lat1, lon1, lat2, lon2) {
	// Convert latitudes and longitudes to radians
	const phi1 = toRad(lat1);
	const lambda1 = toRad(lon1);
	const phi2 = toRad(lat2);
	const lambda2 = toRad(lon2);

	// Calculate the difference in longitude
	const deltaLambda = lambda2 - lambda1;

	// Calculate X and Y
	const y = Math.sin(deltaLambda) * Math.cos(phi2);
	const x =
		Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

	// Calculate the initial bearing in radians
	let theta = Math.atan2(y, x);

	// Convert the bearing to degrees
	let bearing = theta * (180 / Math.PI);

	// Normalize the bearing to be between 0 and 360
	let angle = (bearing + 360) % 360;

	//round the angle to 2 decimal palces
	return (Math.round(angle) * 100) / 100;
}
