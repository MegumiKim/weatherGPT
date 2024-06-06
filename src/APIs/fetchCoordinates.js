// Geo location data from https://nominatim.org/

export default async function fetchCoordinates(userInquery) {
  const URL = `https://nominatim.openstreetmap.org/search?city=${userInquery}&format=json&limit=1`;
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Request failed!");
    }
    if (data.length === 0) {
      throw new Error("No data found!");
    }

    const lan = Math.round(data[0].lat * 1000) / 1000;
    const lon = Math.round(data[0].lon * 1000) / 1000;
    const location_name = data[0].display_name;
    return { lan, lon, location_name };
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
