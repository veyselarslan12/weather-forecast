function searchCity() {
  var cityName = document.getElementById("cityInput").value.trim();
  if (cityName === "") return; // Don't proceed if input is empty

  // Append searched city to the list
  var searchedCitiesDiv = document.getElementById("searchedCities");
  var cityItem = document.createElement("a");
  cityItem.href = "#"; // You can link to the city's forecast page if you want
  cityItem.classList.add("list-group-item", "list-group-item-action","list-group-item-primary" );
  cityItem.textContent = cityName;
  searchedCitiesDiv.appendChild(cityItem);

  // Clear the input field after adding the city
  document.getElementById("cityInput").value = "";

  // Add click event listener to each city item
  cityItem.addEventListener("click", function () {
    // Implement what happens when you click on a city item
    console.log("Clicked on", cityName);
  });
}

// function searchCity() {
//   var cityName = document.getElementById("cityInput").value.trim();
//   if (cityName === "") return; // Don't proceed if input is empty

//   // Fetch weather data for the selected city
//   fetchWeatherData(cityName);
// }

// function fetchWeatherData(cityName) {
//   var apiKey = "YOUR_API_KEY"; // Replace this with your actual API key
//   var apiUrl =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     cityName +
//     "&appid=" +
//     apiKey;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       // Process the weather data and display it on the webpage
//       displayWeatherData(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching weather data:", error);
//     });
// }

// function displayWeatherData(weatherData) {
//   // Example of how you might display the weather data on the webpage
//   console.log("Weather data:", weatherData);
//   // You can parse the weather data and display it as per your requirement
// }
