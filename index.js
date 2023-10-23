let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
document.querySelector(".date").innerHTML = `${day} ${hours}:${minutes}`;

function changeCity(event) {
  event.preventDefault();
  document.querySelector(".cityName").innerHTML = document.querySelector(
    "#exampleInputEmail1"
  ).value;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let city = document.querySelector("#exampleInputEmail1").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
document.querySelector("#form1").addEventListener("submit", changeCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".bigTemp");
  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  document.querySelector(".cityName").innerHTML = `${response.data.name}`;
  document.querySelector(".addtemperature-low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector(".addtemperature-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector(".addtemperature-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector(".addtemperature-humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector(".btn-info");
currentButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(".bigTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector(".bigTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
