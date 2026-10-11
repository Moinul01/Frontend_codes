const apiKey = "221335980d5d8aa6685826ef7ef1b905";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Added dots (.) to target classes correctly
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&appid=${apiKey}&q=${city}`);
    
    // Check if the city exists
    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none"; // Hide weather box on error
        alert("Invalid city name.");
        return;
    }
    
    const data = await response.json();
    //console.log(data);

    // Updated ".temperature" to match your HTML's ".temp" class
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Optional: Update weather icon dynamically based on weather condition
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block"; 
    // Show the weather section after fetching data
}

// Default load on startup
checkWeather("");

// Event listener for search button click
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});