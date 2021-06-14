function updateHeading(response) {
  let heading = document.querySelector("#current-temperature");
  let cityName = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(3.6 * response.data.wind.speed);
  let temp = Math.round(response.data.main.temp);
  let name = response.data.name;
  heading.innerHTML = temp;
  cityName.innerHTML = name;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
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
