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
function formateDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${dayOfMonth}.${month}.${year} - ${hours}:${minutes}`;
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let weatherStateElement = document.querySelector("#weather-state");
  weatherStateElement.innerHTML = response.data.condition.description;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  feelsLikeElement.innerHTML = `${Math.round(feelsLike)} °C`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let dateElement = document.querySelector("#weather-date");
  let date = new Date(response.data.time * 1000);
  dateElement.innerHTML = formateDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url} "class="weather-icon"/>`;

  getForecast(response.data.city);
}

function updateHighLow(dayData) {
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  highElement.innerHTML = `${Math.round(dayData.temperature.maximum)} °C`;
  lowElement.innerHTML = `${Math.round(dayData.temperature.minimum)} °C`;
}

searchCity("St.Gallen");

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cf40cbba3b587f08e75d7ob82t7ad6ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    let todayData = response.data.daily[0];
    updateHighLow(todayData);
    displayForecast(response);
  });
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDate(day.time)}</div>
            <div class="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }"/></div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-high"><strong>${Math.round(
                day.temperature.maximum
              )}°C </strong></div>
              <div class="weather-forecast-low"> | ${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
