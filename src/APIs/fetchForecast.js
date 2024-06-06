import { convertTimeString } from "../lib/utils/convertTimeString.js";

export default async function fetchForecast(lan, lon) {
  const URL = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lan}&lon=${lon}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const timeSeries = data.properties.timeseries;

    let serialForecast = [];

    for (let i = 0; i < 48 && i < timeSeries.length; i += 4) {
      const time = timeSeries[i];
      const formattedTime = convertTimeString(time.time);
      const display_date = formattedTime.split(", ")[0];
      const display_time = formattedTime.split(", ")[1];

      const hourForecast = {
        date: display_date,
        time: display_time,
        temperature: time.data.instant.details.air_temperature,
        wind_speed: time.data.instant.details.wind_speed,
        humidity: time.data.instant.details.relative_humidity,
        precipitation: time.data.next_1_hours?.details?.precipitation_amount,
        UV_index: time.data.instant.details?.ultraviolet_index_clear_sky,
      };

      // console.log(hourForecast);
      serialForecast.push(hourForecast);
    }
    const summary = await data?.properties.timeseries[0].data.next_6_hours
      .summary.symbol_code;
    const forecast = {
      serialForecast: serialForecast,
      summary: summary,
    };

    return forecast;
  } catch (error) {
    return error;
  }
}
