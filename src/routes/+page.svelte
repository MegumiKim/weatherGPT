<script>
import fetchCoordinates from '../APIs/fetchCoordinates.js';
import fetchForecast from '../APIs/fetchForecast.js';
import ForecastTable from '../components/ForecastTable.svelte';
import { capitalizeWords } from '$lib/utils/capitaliseWords.js';
import { weatherSymbolKeys } from '$lib/utils/weatherSymbolKeys.js';
import { onMount } from 'svelte';
import getBrowserLocation from '$lib/utils/getLocation.js';
import Form from '../components/Form.svelte';
import fetchLocation from '../APIs/fetchLocation.js';
  import CheckList from '../components/CheckList.svelte';
import generateImage from '../APIs/fetchImage.js';
  import WeatherImg from '../components/WeatherImg.svelte';
let error = null;
let loading = false;
let summary = null;
let serialForecast = null;
let lon = 0;
let lan = 0;
let current_weather = null;
let location = null;
let weatherSymbolCode = null;
// let weatherImage = null;
// let recommendation = null;



onMount(async () => {
loading = true;
	try {
				const geoLocation = await getBrowserLocation();
				if (!geoLocation) {
				throw new Error('Failed to fetch location');
				}
		lon = await geoLocation.coords.longitude;
		lan = await geoLocation.coords.latitude;
		
		location = await fetchLocation(lan, lon);
		await renderWeatherForecast(lan, lon);
		if (!current_weather) {
			throw new Error('Failed to fetch weather');
		}

		
	} catch (e) {
		error = e.message;
	} finally {
		loading = false;
	}
}
);

const handleSubmit = async (event) => {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);
	const placeInQuery = data.place?.trim();

const {lan, lon, location_name} = await fetchCoordinates(placeInQuery);
if(!lan || !lon){
	error = 'Location not found';
	return;
}

renderWeatherForecast(lan, lon);
location = location_name



};


async function renderWeatherForecast(lan, lon) {
loading = true;
	try {
		const forecast = await fetchForecast(lan, lon);
	// location = location_name
	if (!forecast) {
	error = 'Failed to fetch forecast';
	}
	
	serialForecast = forecast?.serialForecast;
	current_weather = serialForecast?.[0]
	const summaryBeforeFormatting = forecast?.summary.replace("_", " ");
	summary = capitalizeWords(summaryBeforeFormatting);
	weatherSymbolCode = weatherSymbolKeys[forecast?.summary];



	} catch (error) {
		error = 'Failed to fetch forecast';
	}finally{
		loading = false;
	}
}


</script>

<svelte:head>
	<title>Weather App</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<header>
	<Form handleSubmit={handleSubmit} />
	{#if location}
	<h3 class="location">{location}</h3>
	{/if}
</header>

{#if loading}
<p>Loading...</p>
{/if}

<div class={loading===false? "report visible" : ""} >
	{#if error}
	<h2 class="error">{error}</h2>
	{/if}
	<section class="current_weather">
		<div class="summary-list-wrapper">
			{#if summary}
					<div class="summary-wrapper">
						<div>
							<img src={`/symbols/lightmode/png/100/${weatherSymbolCode}.png`} alt={`weather icon for ${summary}`}>
			
							{#if summary}
							<h3>{summary}</h3>
							{/if}
						</div>
						{#if current_weather}
						<div class="current">
							<h1>{current_weather.temperature} <sub>°C</sub></h1>
							<p>Precipitation: {current_weather.precipitation} mm</p>
							<p>Wind Speed: {current_weather.wind_speed} m/s</p>
							<p>Wind Speed: {current_weather.UV_index} m/s</p>
						</div>
						{/if}
					</div>
			{/if}
			<CheckList current_weather={current_weather} location={location} />

		</div>
		<WeatherImg current_weather={current_weather} location={location} />
	</section>

	


	<section>
		<div class="forecast">
			{#if serialForecast}
				<ForecastTable serialForecast={serialForecast} />
			{/if}
		</div>
</section>
</div>


<style>

img{
	width: 100px;
	height: 100px;
	margin: auto;
}

.report {
    opacity: 0;
    transition: opacity 1s ease-out;
}
.report.visible {
    opacity: 1;
}

.forecast{
	/* display: flex; */
	flex: 1;
	justify-content: center;
}

p{
	margin: 0;
}
header{
	display: flex;
justify-content: space-between;
margin-bottom: 2em;
border-bottom: #a6a5a5 1px solid;
}


	h1{
		font-size: 5em;
		font-weight: bold;
		margin: 0;
	display: flex;

	}

	sub{
		font-size: 0.5em;
	}
	h2{
		font-size: 2em;
		font-weight: bold;
	}

	h3{
margin: auto 0;
	}
	.current{
text-align: center;

	}

	.current_weather{
		display: flex;
		gap: 2em;
	margin-bottom: 2em;
	}

	.summary-list-wrapper{
		display: flex;
		flex-direction: column;
	gap: 2em;
	margin: 2em 0;
	}

	.summary-wrapper{
		flex: 1;
		display: flex;
gap: 2em;
		align-items: center;
		margin: auto;
	}

.error{
	color: rgb(160, 55, 2);
	text-align: center;
}

@media (max-width: 600px) {
	h1{
		font-size: 3em;
	}
	.report{
		display: flex;
		flex-direction: column;
	}
	.summary-list-wrapper{
		flex-direction: column;
	}
	.summary-wrapper{
		flex-direction: column;
	}
	.current{
		font-size: 1em;
	}

	li{
		font-size: 1em;
	}
}
</style>
