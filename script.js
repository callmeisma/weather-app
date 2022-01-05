const apiKey = "50b1eebb44635563594202ca273ba117";
let unit = "imperial";

// get location from user
function getInput() {
  const userInput = document.getElementById("userInput").value;
  getWeather(userInput, unit);
}

// fetch weather from user location
async function getWeather(location, units) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&q=${location}&units=${units}`,
    { mode: "cors" }
  );
  if (response.status === 400) {
    const warning = document.getElementById("warning");
    warning.innerHTML = "Enter a city name";
    setTimeout(function () {
      warning.innerHTML = "";
    }, 2000);
  } else if (response.status === 404) {
    const warning = document.getElementById("warning");
    warning.innerHTML = "Invalid search.";
    setTimeout(function () {
      warning.innerHTML = "";
    }, 2000);
  } else {
    const weatherData = await response.json();
    const cleanData = processData(weatherData);
    displayData(cleanData);
  }
}

function processData(weatherData) {
  const cleanData = {
    desc: weatherData.weather[0].main,
    city: weatherData.name,
    temperature: weatherData.main.temp,
    feels: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    speed: weatherData.wind.speed,
  };

  return cleanData;
}

function displayData(cleanData) {
  const display = document.getElementById("display");

  const desc = document.getElementById("desc");
  const city = document.getElementById("city");
  const temp = document.getElementById("temp");
  const feel = document.getElementById("feel");
  const humid = document.getElementById("humid");
  const speed = document.getElementById("speed");

  desc.innerHTML = cleanData.desc;
  city.innerHTML = cleanData.city;
  temp.innerHTML = `${cleanData.temperature.toFixed(0)}&#176`;
  feel.innerHTML = `${cleanData.feels.toFixed(0)}&#176`;
  humid.innerHTML = `${cleanData.humidity.toFixed(0)}&#37`;

  const speedUnit = unit === "imperial" ? "mph" : "km/h";
  speed.innerHTML = `${cleanData.speed} ${speedUnit}`;
}

function unitSwitch() {
  const city = document.getElementById("city");
  const button = document.getElementById("unitBtn");
  if (unit === "imperial") {
    button.innerHTML = "C";
    button.classList.remove("btn-success");
    button.classList.add("btn-warning");
    getWeather(city.innerHTML, "metric");
    unit = "metric";
  } else {
    button.innerHTML = "F";
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");
    getWeather(city.innerHTML, "imperial");
    unit = "imperial";
  }
}

function submitKey(e) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    getInput();
  }
}

getWeather("Miami", unit);

document.addEventListener("keydown", submitKey);
