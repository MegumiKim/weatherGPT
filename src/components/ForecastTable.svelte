<script>
  export let serialForecast;
  
</script>

<table class="forecast-table">
  <thead>
    <tr>
    <th></th>
    <th></th>
    <th>Temp.</th>
    <th></th>
    <th>UV Index</th>
    <th>Humidity</th>
    <th>Wind</th>
    </tr>
  </thead>
  {#each serialForecast.slice(1) as forecast} 
  <tbody>
    <tr>
    <td>{forecast.date}</td>
    <td>{forecast.time}</td>
    <td class={forecast.temperature >= 30 ? "red":""}>{forecast.temperature} °C</td>
    <td>{forecast.precipitation > 0 ? `${forecast.precipitation} mm`: ""} </td>
    <td >{forecast.UV_index} </td>
    <td>{Math.round(forecast.humidity)} %</td>
    <td>{forecast.wind_speed} m/s</td>
    </tr>
      <!-- Add more <tr> elements here for each forecast item -->
  </tbody>
  {/each}
</table>

<style>

.forecast-table {
    width: 100%;
    border-collapse: collapse;
}

.forecast-table thead th {
    color: gray;
    padding: 10px;
}

.forecast-table tbody td {
    text-align: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.forecast-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

.red{
    color: red;
}


</style>