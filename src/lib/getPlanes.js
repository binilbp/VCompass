export async function fetchPlanesFromAPI(latitude, longitude) {
	isLoading = true;
	error = null;
	console.log(`Fetching planes for: ${latitude}, ${longitude}`);

	// 1. Construct the URL with query parameters
	// This format ?lat=...&lon=... is what your FastAPI endpoint expects
	const apiUrl = `http://127.0.0.1:8000/api/planes?lat=${latitude}&lon=${longitude}`;

	try {
		// 2. Call the API using fetch
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		// 3. Parse the JSON data from the response
		const data = await response.json();

		// 4. Update your reactive variable to display the data
		planes = data;
		console.log('Received planes:', planes);
	} catch (err) {
		error = `Failed to fetch planes: ${err.message}`;
		console.error(err);
	} finally {
		isLoading = false;
	}
}
