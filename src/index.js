let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchbar");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "cf40cbba3b587f08e75d7ob82t7ad6ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

searchCity("St.Gallen");
