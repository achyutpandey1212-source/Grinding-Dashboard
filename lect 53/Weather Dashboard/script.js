// ---

// ## Scenario 1 — Weather Dashboard with Error Handling

// Build a small weather dashboard that fetches current weather data from a public weather API (e.g., OpenWeatherMap).

// ### Requirements

// - Make the API request asynchronously using `fetch` with `async/await`.
// - Handle API request failures (for example, invalid city name) using `try/catch`.
// - Create and throw custom errors based on weather conditions (e.g., extremely high or low temperature) and handle them appropriately.

// ### Suggested tasks

// - Build a simple UI to input a city name and display the result.
// - Show user-friendly error messages for network errors, invalid input, or API errors.
// - Demonstrate at least one custom thrown error (e.g., `ExtremeTemperatureError`) and handle it in the UI.

// --- -----------------------------------------


async function getWeather(city){
    let apikey = `d03390a698fa4cab8c356dd20c5aaf16`;

    try{
        let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        
        if(!raw.ok){
            throw new Error(`City ${city} not found / Something went wrong`);
        }
        
        let data = await raw.json();

        if(data.main.temp < 0){
            console.log(`Its too cold in ${city}... ${data.main.temp}°C`)
        }else if(data.main.temp > 40){
            console.log(`Its too hot in ${city}... ${data.main.temp}°C`)
        }else{
            console.log(`Pleasant day in ${city}... ${data.main.temp}°C`)
        }
    }catch(err){
        console.log(err.message);
    }
}

getWeather("alaska");