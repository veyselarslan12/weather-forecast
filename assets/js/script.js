const apiKey = "0e65efea80d9a0647c2d571b6099538a";

const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

function searchCity() {
  const cityName = document.getElementById("cityInput").value;

  // Check if input is not empty and not already searched
  if (cityName && !searchedCities.includes(cityName)) {
    searchedCities.unshift(cityName); // Add the city to the beginning of the array
    savedCities();
    displayCities();
    document.getElementById("cityInput").value = ""; // Clear the input field
  }

  getCityData(cityName)
}

console.log(searchedCities);


function displayCities() {
  const searchedCitiesElement = document.getElementById("searchedCities");
  searchedCitiesElement.innerHTML = ""; // Clear previous cities

  // Display all searched cities
  searchedCities.forEach((city) => {
    const listItem = document.createElement("a");
    listItem.href = "#"; // You can add a link to each city if you want
    listItem.className =
      "list-group-item list-group-item-action list-group-item-warning";
    listItem.textContent = city;
    searchedCitiesElement.appendChild(listItem);
  });
}

function savedCities() {
  localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

const button =  document.querySelector(".btn");
button.addEventListener('click', searchCity )


// 1.st request
function getCityData(city){

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchedCities}&appid=${apiKey}&units=imperial`
  ).then(function (response) {
    if( !response.ok){
      showError(`Please enter a valid city name.`)
    }
    return response.json()
  }).then(function(json){
    console.log(json)
    getForecast(json.coord.lat,json.coord.lon)
  }) 
   
  
}


function getForecast(lat, lon){
  
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  ).then(function (response) {
    return response.json()
  }).then(function(json){
    
  })
  
}

