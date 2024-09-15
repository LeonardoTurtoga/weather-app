let locationInfoDiv = document.getElementById("location-h1");
const timeInfoDiv = document.getElementById("time-text");
const tempInfoDiv = document.getElementById("temp");
const tempDesInfoDiv = document.getElementById("descript");
const humInfoDiv = document.getElementById("hum");
const windInfoDiv = document.getElementById("wind-speed");

const iconImage = document.getElementById("icon");

getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weather);
  }
}
let baseIconUrl = "https://openweathermap.org/img/wn/";
const API_KEY = "YOUR_API_KEY";
async function weather(pos) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&APPID=${API_KEY}`;

  let res = await fetch(weatherUrl);
  let data = await res.json();
  weatherDisplay(data);
}
setInterval(function () {
  getLocation();
}, 1000);

function weatherDisplay(data) {
  const time = new Date(data.dt * 1000);

  locationInfoDiv.innerHTML = `${data.name}, ${data.sys.country}`;
  timeInfoDiv.innerHTML = `${formatTime(time)}`;
  tempInfoDiv.innerHTML = `${Math.round(data.main.temp)} °C`;
  tempDesInfoDiv.innerHTML = `${data.weather[0].description}`;
  humInfoDiv.innerHTML = `${data.main.humidity}%`;
  windInfoDiv.innerHTML = `${data.wind.speed} Km/h`;

  let iconDisplay = `${baseIconUrl}${data.weather[0].icon}@4x.png`;
  iconImage.src = iconDisplay;
}

function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes() + 1;
  let ampm = hours >= 12 ? "PM" : "AM";
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours % 12;
  hours = hours == 0 ? 12 : hours;
  return `${hours}:${minutes} ${ampm}`;
}
