// Open Weather Api Key
const apiKey = "0e65efea80d9a0647c2d571b6099538a";

let defaultCity = "Madison";
// Getting saved cities from local storage
const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
// Getting data from Open Weather Api to show default city weather
document.addEventListener("DOMContentLoaded", function() {
    getCityData(defaultCity);
});
// Search for a city and display the current and 5-day forecast
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
// Displays cities and creates list items down below search bar
function displayCities() {
    const searchedCitiesElement = document.getElementById("searchedCities");
    searchedCitiesElement.innerHTML = "";

    searchedCities.forEach((city, index) => {
        const listItem = document.createElement("a");
        listItem.href = "#";
        listItem.className = "list-group-item list-group-item-action list-group-item-warning";
        listItem.id = `city-${index}`;
        listItem.textContent = city;

        listItem.addEventListener('click', function() {
          getCityData(city)
        })

        searchedCitiesElement.appendChild(listItem);
    });
}
// Saving cities to local storages
function savedCities() {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}
// Search button event listener 
const button = document.querySelector(".btn"); 
button.addEventListener("click", searchCity);

// Fetching data from Open Weather Api 
function getCityData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            if (!response.ok) {
                showError(`Please enter a valid city name.`);
            }
            return response.json();
        })
        .then(function(json) {
            // console.log(json);
            getForecast(json.coord.lat, json.coord.lon);
        })
        .catch(function(error) {
            console.error("Failed to fetch weather data:", error);
        });
}

// Fetching forecast data from Open Weather Api
function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // console.log(json)
            // Creating main card for weather data
            const cityName = json.city.name;
            const temp = json.list[0].main.temp;
            const wind = json.list[0].wind.speed;
            const humidity = json.list[0].main.humidity;
            const icon = json.list[0].weather[0].icon;
            const date = new Date(json.list[0].dt * 1000).toLocaleDateString();

            // Selecting spans for weather data
            document.getElementById("span-city-name").textContent = cityName;
            document.getElementById("span-temp").textContent = temp;
            document.getElementById("span-wind").textContent = wind;
            document.getElementById("span-humidity").textContent = humidity;
            document.getElementById("span-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
            document.getElementById("span-date").textContent = date;

           
            document.getElementById("card-container").innerHTML = "";
            
            
            const datesArray = []
            for(const weatherObject of json.list) {
              const yearDate = new Date(weatherObject.dt_txt.split(' ')[0]).toLocaleDateString();
              
              if(!datesArray.includes(yearDate) ){
                datesArray.push(yearDate)
                renderCardElement(weatherObject, yearDate)
              }
            }

        })
        .catch(function(error) {
            console.error("Failed to fetch forecast data:", error);
        });
}

// Creating and rendering the cards for the forecast data 
function renderCardElement (weatherObject, yearDate){
//   console.log(weatherObject)
  const forecastContainer = document.querySelector('#card-container')  
  const card = document.createElement( "div" );
  card.classList.add("card", "text-bg-secondary");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body")
  const h5 = document.createElement("h5");
  h5.classList.add("card-title")
  const tempEl = document.createElement("p");
  tempEl.classList.add("card-text");
  const windEl = document.createElement("p");
  windEl.classList.add("card-text");
  const humidityEl = document.createElement("p");
  humidityEl.classList.add("card-text");
  const imgEl = document.createElement('img')
  imgEl.setAttribute('src', `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}.png` )

    
  h5.innerText = yearDate
  tempEl.innerText = `Temp: ${weatherObject.main.temp} °F `
  windEl.innerText = `Wind: ${weatherObject.wind.speed} mph`
  humidityEl.innerText = `Humidity: ${weatherObject.main.humidity} %`
  
  // Created 5 days weather cards and appended them to the card container
  forecastContainer.appendChild(card)
  card.appendChild(cardBody)
  cardBody.appendChild(h5)
  h5.appendChild(imgEl)
  cardBody.appendChild(tempEl)
  cardBody.appendChild(windEl)
  cardBody.appendChild(humidityEl)
  
}