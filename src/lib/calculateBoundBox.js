export function getOpenSkyBoundingBox(centerLat, centerLon, radiusKm = 16) {
	// An approximate constant for km per degree of latitude
	const KM_PER_DEGREE_LAT = 111.1;

	// Convert latitude to radians for the cosine function
	const centerLatRad = centerLat * (Math.PI / 180);

	// Calculate the change in latitude (this is constant)
	const latDelta = radiusKm / KM_PER_DEGREE_LAT;

	// Calculate the change in longitude (this varies with latitude)
	const lonDelta = radiusKm / (KM_PER_DEGREE_LAT * Math.cos(centerLatRad));

	const lamin = centerLat - latDelta;
	const lamax = centerLat + latDelta;
	const lomin = centerLon - lonDelta;
	const lomax = centerLon + lonDelta;

	return { lamin, lomin, lamax, lomax };
}
