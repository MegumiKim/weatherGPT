function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

// Export an asynchronous load function that can be awaited by Svelte
export async function load() {
  try {
    // const position = await getLocation();
    // // You might want to process the position or pass only specific parts of it
    // const location = {
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude,
    // };
    // return { location }; // Use props to pass data to the component
  } catch (error) {
    console.log(error);
    // return { status: 404, error: error.message };
  }
}
