export default async function fetchClothing(weatherData, location) {
  // console.log("weatgerData", weatherData);

  const url = "https://api.openai.com/v1/chat/completions";

  const prompt = `
  Weather Data: ${JSON.stringify(weatherData)}, Location: ${location}
  Given the provided weather data and location, make a lit of recommended activities suitable for the weather in that particular location in simple, comma-separated format. 
  Example format: Kite surfing, Sunbathing, Museum Visit, Ice Fishing, etc`;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  try {
    const response = await fetch(url, params);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Request failed!");
    }

    return await data?.choices[0].message?.content;
  } catch (error) {
    return error;
  }
}
