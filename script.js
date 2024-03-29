// script.js
document.getElementById("get-weather-btn").addEventListener("click", function () {
    const locationInput = document.getElementById("location-input").value;

    if (locationInput.trim() !== "") {
        getWeatherData(locationInput);
    } else {
        alert("Please enter a location");
    }
});

function getWeatherData(location) {
    const apiKey = "8f7fe5343efe43c0ca5c0c14e0a2b595"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });
}

function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById("weather-info");
    const body =document.body;

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;


    const weatherBackgrounds = {
        "clear sky": "url('./images/clear sky.jpg')",
        "few clouds": "url('./images/blue-sky-few-white-clouds-260nw-674770756.webp')",
        "scattered clouds": "url('./images/scattered clouds.jpg')",
        "broken clouds": "url('./images/broken_clouds.jpg')",
        "shower rain": "url('./images/shower_rain.jpg')",
        "rain": "url('./images/rain.jpg')",
        "thunderstorm": "url('./images/thunderstorm.jpg')",
        "snow": "url('./images/snow.jpg')",
        "mist": "url('./images/mist.jpg')"  ,
        "overcast clouds": "url('./images/overcast clouds.jpg')"
    };

        body.style.backgroundImage = weatherBackgrounds[weatherDescription.toLowerCase()];



    const weatherHtml = `
        <div class="weather-data">
            <span>City:</span> ${cityName}
        </div>
        <div class="weather-data">
            <span>Temperature:</span> ${temperature}°C
        </div>
        <div class="weather-data">
            <span>Condition:</span> <span class="weather-description">${weatherDescription}</span>
        </div>
        <div class="weather-data">
            <span>Humidity:</span> ${humidity}%
        </div>
        <div class="weather-data">
            <span>Wind Speed:</span> ${windSpeed} m/s
        </div>
    `;

    weatherInfoContainer.innerHTML = weatherHtml;
}
