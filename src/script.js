function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `Last updated ${day} ${hours}:${minutes}`;
}

function updateHeading(response) {
  let heading = document.querySelector("#current-temperature");
  let cityName = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  let weatherIcon = document.querySelector("#weather-icon");
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(3.6 * response.data.wind.speed);
  let temp = Math.round(response.data.main.temp);
  let name = response.data.name;
  let description = response.data.weather[0].main;
  let currentDate = document.querySelector("#current-date");
  let icondID = response.data.weather[0].icon;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  if (description === "Clear") {
    description = "Sunny";
  }
  if (description === "Clouds") {
    description = "Cloudy";
  }
  heading.innerHTML = temp;
  cityName.innerHTML = name;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  weatherDescription.innerHTML = description;

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icondID}@2x.png`
  );
}

function getLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "4cee29ecbdcb246efdb3579f6d95b7f0";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateHeading);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocationTemp);
}

function search(city) {
  let apiKey = "4cee29ecbdcb246efdb3579f6d95b7f0";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateHeading);
}
function updateLocation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;
  cityName = cityName.toLowerCase();
  cityName = cityName.trim();
  search(cityName);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateLocation);

search("New york");
