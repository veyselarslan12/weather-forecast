const apiKey = "0e65efea80d9a0647c2d571b6099538a";

let defaultCity = "Madison";
const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

document.addEventListener("DOMContentLoaded", function() {
    getCityData(defaultCity);
});

function searchCity(event) {
    event.preventDefault();
    const cityName = document.getElementById("cityInput").value;

    if (cityName && !searchedCities.includes(cityName)) {
        searchedCities.unshift(cityName);
        savedCities();
        displayCities();
        document.getElementById("cityInput").value = "";
    }

    getCityData(cityName);
}

function displayCities() {
    const searchedCitiesElement = document.getElementById("searchedCities");
    searchedCitiesElement.innerHTML = "";

    searchedCities.forEach((city) => {
        const listItem = document.createElement("a");
        listItem.href = "#";
        listItem.className = "list-group-item list-group-item-action list-group-item-warning";
        listItem.textContent = city;
        searchedCitiesElement.appendChild(listItem);
    });
}

function savedCities() {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

const button = document.querySelector(".btn");
button.addEventListener("click", searchCity);

function getCityData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            if (!response.ok) {
                showError(`Please enter a valid city name.`);
            }
            return response.json();
        })
        .then(function(json) {
            console.log(json);
            getForecast(json.coord.lat, json.coord.lon);
        })
        .catch(function(error) {
            console.error("Failed to fetch weather data:", error);
        });
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const cityName = json.city.name;
            const temp = json.list[0].main.temp;
            const wind = json.list[0].wind.speed;
            const humidity = json.list[0].main.humidity;
            const icon = json.list[0].weather[0].icon;
            const date = new Date(json.list[0].dt * 1000).toLocaleDateString();

            document.getElementById("span-city-name").textContent = cityName;
            document.getElementById("span-temp").textContent = temp;
            document.getElementById("span-wind").textContent = wind;
            document.getElementById("span-humidity").textContent = humidity;
            document.getElementById("span-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
            document.getElementById("span-date").textContent = date;
        })
        .catch(function(error) {
            console.error("Failed to fetch forecast data:", error);
        });
}