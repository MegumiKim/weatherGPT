<script>
import generateImage from "../APIs/fetchImage";

  export let current_weather;
  export let location;
  let weatherImageUrl = null

  $: if (current_weather && location) {
    fetchWeatherImage(); 
  }

  async function fetchWeatherImage() {
    weatherImageUrl = null;
    try {
    weatherImageUrl = await generateImage(current_weather, location);

    } catch (error) {
      console.error("Failed to fetch weather image:", error);
      weatherImageUrl = null;
    }
  }
</script>

{#if weatherImageUrl}
    <div><img src={weatherImageUrl} alt="Depiction of the weather and location" sizes="(max-width: 512px) 512px,
      512px" /></div>
{/if}


<style>
  div {
width: 100%;
  }

  img {
      border-radius: 16px;
        width: 100%;
        height: auto;
    }
</style>