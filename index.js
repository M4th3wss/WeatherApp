// Select elements
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

const cityName = document.querySelector(".location h1");
const dateTime = document.querySelector(".location p");
const weatherIcon = document.querySelector(".weather-icon img");
const temperature = document.querySelector(".temperature h2");
const humidity = document.querySelector(".humidity p");
const wind = document.querySelector(".wind p");
const feelsLike = document.querySelector(".feels-like p");

const API_KEY = "9243c3731e462cbd00ba2e8b40cae8e1";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        // Update UI
        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + " km/h";
        feelsLike.textContent = Math.round(data.main.feels_like) + "°C";

        // Date + Time
        const now = new Date();
        dateTime.textContent = now.toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit"
        });

        // Weather icon selection
        const weather = data.weather[0].main.toLowerCase();
        if (weather.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (weather.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (weather.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (weather.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (weather.includes("snow")) {
            weatherIcon.src = "images/snow.png";
        } else if (weather.includes("mist") || weather.includes("fog")) {
            weatherIcon.src = "images/mist.png";
        } else if (weather.includes("wind")) {
            weatherIcon.src = "images/wind.png";
        } else if (weather.includes("humidity")) {
            weatherIcon.src = "images/humidity.png";
        } else {
            weatherIcon.src = "images/clear.png"; // fallback
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(searchBox.value);
    }
});
