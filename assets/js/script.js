// set all cards initial display to none so they do not appear empty upon first loading page
var now = dayjs().format('MM-DD-YYYY');
var currentWeather = document.querySelector('.current-weather');
   currentWeather.style.display = 'none';
   
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
        console.log(coord);
        console.log(lon);
        console.log(lat);
        
        console.log(now);

        getForecast(lat, lon);


        // set textcontent for main card using data from api fetch
        var tempEl = document.getElementById('temp');
        var windEl = document.getElementById('wind');
        var humidityEl = document.getElementById('humidity');
        var mainCardHeader = document.getElementById('main-card-header');
        tempEl.textContent = "Temp: " + data.main.temp +" °F ";
        windEl.textContent = "Wind: " + data.wind.speed + ' MPH' ;
        humidityEl.textContent = "Humidity: " + data.main.humidity + ' %';
        mainCardHeader.textContent = data.name + ' ' + now;
        // display currentWeather
        currentWeather.style.display = null;

        
    })

}


var getForecast = function (lat, lon) {
    var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+ apiKey + "&units=imperial";
    fetch(forecastApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        for (i=5; i <= data.list.length; i+=8) {
            console.log( 'new Day');
            var forecastTemp = (data.list[i].main.temp);
            var forecastHum = (data.list[i].main.humidity);
            var forecastWind = (data.list[i].wind.speed);
            var forecastDate = (data.list[i].dt_txt);

            var forecastEl = document.getElementById('forecast');
            var forecastCard = document.createElement('div');
            var cardEl = document.createElement('div');
            var forecastHeader = document.createElement('div');
            var forecastBody = document.createElement('div');
            var forecastIcon = document.createElement('h4');
            var forecastInfo = document.createElement('p');

            forecastCard.setAttribute('class', 'd-flex col-12 col-md ');
            cardEl.setAttribute('class', 'card text-white bg-info m-1');
            forecastHeader.setAttribute("class","card-header");
            forecastBody.setAttribute('class','card-body');
            forecastIcon.setAttribute('class','card-title');
            forecastInfo.setAttribute('class','card-text');

            cardEl.textContent = 'Temp: ' + forecastTemp + '\n Humidity: ' + forecastHum + "\n Wind: " + forecastWind;
            forecastEl.appendChild(forecastCard);
            forecastCard.appendChild(cardEl);
            forecastCard.appendChild(forecastHeader);
            forecastCard.appendChild(forecastBody);
            forecastBody.appendChild(forecastIcon);
            forecastBody.appendChild(forecastInfo);
        }
        
    

    })
    
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
