let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
/* let city = prompt("Enter a city").trim().toLowerCase();
if (Object.keys(weather).includes(city)) {
  alert(
    "It is currently " +
      Math.round(weather[city].temp) +
      "°C (" +
      Math.round((weather[city].temp * 9) / 5 + 32) +
      "°F) in " +
      city +
      " with a humidity of " +
      weather[city].humidity +
      "%"
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      city
  );
}
*/
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

/* function changeTempF(event) {
  event.preventDefault();
  document.querySelector(".bigTemp").innerHTML = 75;
}
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", changeTempF);

function changeTempC(event) {
  event.preventDefault();
  document.querySelector(".bigTemp").innerHTML = "24";
}
document.querySelector("#celsius-link").addEventListener("click", changeTempC);
*/

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".bigTemp");
  temperatureElement.innerHTML = `${temperature}`;
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
