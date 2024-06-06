import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function generateImage(weatherData, location) {
  const prompt = `
  Weather Data: ${JSON.stringify(weatherData)}, Location: ${location}
  Given the weather data and location, illustrate people experiencing the weather condition in the location. Depict them dressed appropriately for the weather.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    // size: "512x512",
    style: "natural",
    response_format: "url",
  });
  if (!response) {
    throw new Error("Request failed!");
  }
  return response.data[0].url;
}

//or use b64 format for the img without expiration
// response_format: 'b64_json'
// `<img src="data:image/png;base64,${response.data[0].b64_json}">`
