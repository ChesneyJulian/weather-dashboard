    var apiKey = "270870f74b0a4167c2dabb9a30b68d16" 
// create function to fetch openweathermap api 
var getApi = function (city) {

    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + "&units=imperial";

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        // set data.coord to var coord so the city's coordinates are saved 
        var coord = data.coord; 
        // set lon and lat to separate variables to be used with forecast api
        var lon = coord.lon;
        var lat = coord.lat;
        console.log(data);

        getForecast(lat, lon);
        
        // set textcontent for main card using data from api fetch
        var tempEl = document.getElementById('temp');
        var windEl = document.getElementById('wind');
        var humidityEl = document.getElementById('humidity');
        var mainCardHeader = document.getElementById('main-card-header');
        tempEl.textContent = "Temp: " + data.main.temp;
        windEl.textContent = "Wind: " + data.wind.speed;
        humidityEl.textContent = "Humidity: " + data.main.humidity;
        mainCardHeader.textContent = data.name;
    })

}

var getForecast = function (lat, lon) {
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="+ lon +"&appid=" + apiKey;
}

// set empty array to store all searched cities
var cities = []
document.getElementById('search-btn').addEventListener('click', function(event){
    event.preventDefault();
    // set textinput value to var input using DOM
    var input = document.getElementById('TextInput').value;
    // push input to cities array 
    cities.push(input);
    // use cities array to store searched cities in local storage with key 'city'
    localStorage.setItem('city', JSON.stringify(cities));
    // set var city to value of localstorage('city')
    var city = JSON.parse(localStorage.getItem('city'));
    // set var currentCity to last item in city array because it is the last city entered and the current one being searched
    var currentCity = city[city.length - 1];
    console.log(currentCity); 
    // call getApi function using currentcity
    getApi(currentCity);
    
})
