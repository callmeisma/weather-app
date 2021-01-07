const apiKey = '';

// get location from user
function getInput() {
    const userInput = document.getElementById('userInput').value;
    clearDisplay()
    getWeather(userInput,'imperial');
}

// fetch weather from user location
async function getWeather(location, units) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&q=${location}&units=${units}`, {mode: 'cors'})
    if (response.status === 400) {
        alert('Please input desired city weather');
    } else {
        const weatherData = await response.json();
        const cleanData = processData(weatherData);
        displayData(cleanData);
    }   
}

function processData(weatherData) {
    const cleanData = {
    city: weatherData.name,
    sky: weatherData.weather[0].main,
    temperature: weatherData.main.temp,
    feels: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    }

    return cleanData
}

function displayData(cleanData) {
    const display = document.getElementById('display');

    for (const [key, value] of Object.entries(cleanData)) {
      const info = (`${key} = ${value}`);
      const para = document.createElement('p');
      para.innerText = info;
      display.appendChild(para);
    }
}

function clearDisplay() {
    const display = document.getElementById('display');

    while (display.firstChild) {
        display.removeChild(display.lastChild);
      }
}