// const apiKey = '0e65efea80d9a0647c2d571b6099538a';

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
//   .then(function(response){
//     console.log(response)
//   })


let searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

    function searchCity() {
        const input = document.getElementById('cityInput').value.trim();

        // Check if input is not empty and not already searched
        if (input && !searchedCities.includes(input)) {
            searchedCities.unshift(input); // Add the city to the beginning of the array
            savedCities();
            displayCities();
            document.getElementById('cityInput').value = ''; // Clear the input field
        }
    }

    function displayCities() {
        const searchedCitiesElement = document.getElementById('searchedCities');
        searchedCitiesElement.innerHTML = ''; // Clear previous cities

        // Display all searched cities
        searchedCities.forEach(city => {
            const listItem = document.createElement('a');
            listItem.href = '#'; // You can add a link to each city if you want
            listItem.className = 'list-group-item list-group-item-action list-group-item-warning';
            listItem.textContent = city;
            searchedCitiesElement.appendChild(listItem);
        });
    }

    function savedCities() {
        localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    }