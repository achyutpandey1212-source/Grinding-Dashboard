// Custom error class for extreme temperatures
class ExtremeTemperatureError extends Error {
    constructor(message, temp, city) {
        super(message);
        this.name = 'ExtremeTemperatureError';
        this.temp = temp;
        this.city = city;
    }
}

async function getWeather(city) {
    let apikey = `d03390a698fa4cab8c356dd20c5aaf16`;

    // Get DOM elements
    const weatherCard = document.getElementById('weatherCard');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const weatherDesc = document.getElementById('weatherDesc');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const errorMsg = document.getElementById('errorMsg');

    // Hide error message initially
    errorMsg.classList.remove('show');

    try {
        let raw = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
        );

        if (!raw.ok) {
            throw new Error(`City ${city} not found / Something went wrong`);
        }

        let data = await raw.json();

        // Update UI with weather data
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDesc.textContent = data.weather[0].description;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

        // Your original temperature logic - now throws custom error
        if (data.main.temp < 0) {
            throw new ExtremeTemperatureError(
                `It's too cold in ${data.name}... ${Math.round(data.main.temp)}°C`,
                data.main.temp,
                data.name
            );
        } else if (data.main.temp > 40) {
            throw new ExtremeTemperatureError(
                `It's too hot in ${data.name}... ${Math.round(data.main.temp)}°C`,
                data.main.temp,
                data.name
            );
        }

        // If temperature is pleasant, show success (no error)
        weatherCard.style.display = 'block';

    } catch (err) {
        // Handle custom extreme temperature error
        if (err instanceof ExtremeTemperatureError) {
            errorMsg.textContent = `⚠️ ${err.message}`;
            errorMsg.classList.add('show');
            weatherCard.style.display = 'block'; // Still show weather data
        } else {
            // Handle other errors (network, invalid city, etc.)
            errorMsg.textContent = `❌ ${err.message}`;
            errorMsg.classList.add('show');
            weatherCard.style.display = 'none';
        }
    }
}

// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeather(city);
    } else {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = '⚠️ Please enter a city name';
        errorMsg.classList.add('show');
    }
});

// Event listener for Enter key press in input field
document.getElementById('cityInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchBtn').click();
    }
});

// Load default city on page load
getWeather('Delhi');
