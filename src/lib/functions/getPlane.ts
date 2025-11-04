export async function getPlane(userLatitude: number, userLongitude: number) {
	console.log(`Running getPlane`);
	// const apiUrl = `http://127.0.0.1:8000/api/planes?lat=${userLatitude}&lon=${userLongitude}`;
	const apiUrl = `http://vcompassapi.onrender.com/api/planes?lat=${userLatitude}&lon=${userLongitude}`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`);
	}
	const data = await response.json();
	return data.plane;
}
