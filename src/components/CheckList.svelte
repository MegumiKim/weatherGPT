<script>
  import fetchClothing from "../APIs/fetchClothing";

  export let current_weather;
  export let location;
  let recommendation = null;

  // Use a reactive statement to react to changes in current_weather and location
  $: if (current_weather && location) {
    fetchClothingRecommendations(); // Fetch recommendations whenever the dependencies change
  }

  async function fetchClothingRecommendations() {
    recommendation = null; // Reset the recommendation while fetching new recommendations
    try {
      const responseInString = await fetchClothing(current_weather, location);
      recommendation = responseInString.split(",");
    } catch (error) {
      console.error("Failed to fetch clothing recommendations:", error);
      recommendation = null; // Handle the error, potentially resetting the recommendation
    }
  }
</script>

{#if recommendation}
<div class="recommendation">
  <h3>Activities</h3>
  <!-- <p>{recommendation}</p> -->
  <ul>
    {#each recommendation as item}
      <li>{item}</li>
    {/each}
  </ul>
</div>
{/if}


<style>
  	.recommendation{
		border: #2c2b2b 2px solid;
		padding: 0.8rem;
		border-radius: 16px;
    max-width: 100%;
	}

	li
	{
		font-size: 1em;
    line-height: 1.3em;
	}
</style>