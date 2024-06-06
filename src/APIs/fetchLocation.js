export default async function fetchLocation(lat, lon) {
  const URL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&addressdetails=12`;

  try {
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      const location_name = data.display_name;
      return location_name;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log("error", error);
  }
}
