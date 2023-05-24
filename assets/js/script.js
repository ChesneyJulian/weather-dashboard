// set main cards initial display to none so it does not appear empty upon first loading page
var currentWeather = document.querySelector('.current-weather');
currentWeather.style.display = 'none';
var forecastEl = document.querySelector('#forecast');

var apiKey = "270870f74b0a4167c2dabb9a30b68d16" 
// create function to fetch openweathermap api 





 
var getApi = function (city) {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + "&units=imperial";

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){

        var searchForm = document.getElementById('search-form');
        // add class col-md so that search form shrinks and allows room for results
        searchForm.classList.add('col-md')
        // set data.coord to var coord so the city's coordinates are saved 
        var coord = data.coord; 
        // set lon and lat to separate variables to be used with forecast api
        var lon = coord.lon;
        var lat = coord.lat;
        console.log(coord);
        console.log(lon);
        console.log(lat);
        var now = dayjs().format('MM-DD-YYYY');
        console.log(now);

        


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
        getForecast(lat, lon);

        
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
        buildForecast(data);
    })
    
}

var buildForecast = function(data) {
    // use for loop to build forecastCards using data from fetch request;start at 6 so data is pulled from 3pm each day; increment by 8 so that pulls data from around noon each day for five days
    for (i=6; i <= data.list.length; i+=8) {
        console.log( 'new Day');
        // set variables to use for textContent defined as data pulled from api at each index position i 
        var forecastTemp = (data.list[i].main.temp);
        var forecastHum = (data.list[i].main.humidity);
        var forecastWind = (data.list[i].wind.speed);
        var dataDate = (data.list[i].dt_txt);
        // slice dataDate and rejoin in forecastDate so that format matches same format as 'now' variable in main card
        var month = dataDate.slice(5, 7);
        var day = dataDate.slice(8, 10);
        var year = dataDate.slice(0, 4);
        var forecastDate = month + '-' + day + '-' + year;
    
// create card elements

        var forecastTitle = document.querySelector('.forecast-title');
        var forecastCard = document.createElement('div');
        var cardEl = document.createElement('div');
        var forecastHeader = document.createElement('div');
        var forecastBody = document.createElement('div');
        var forecastIcon = document.createElement('h4');
        var forecastListTemp = document.createElement('li');
        var forecastListHum = document.createElement('li');
        var forecastListWind = document.createElement('li');

        // set class for card elements and utilize bootstrap styling
        forecastCard.setAttribute('class', 'forecast-card col-12 col-md');
        cardEl.setAttribute('class', 'card text-white bg-info');
        forecastHeader.setAttribute("class","card-header");
        forecastBody.setAttribute('class','card-body h-100 list-style-type-none');
        forecastIcon.setAttribute('class','card-title');

        // set textcontent to display info defined in beginning of function 
        forecastHeader.textContent = forecastDate;
        forecastListHum.textContent = "Humidity: " + forecastHum + " %";
        forecastListTemp.textContent = "Temp: " + forecastTemp + "°F";
        forecastListWind.textContent = "Wind: " + forecastWind + " MPH";
        forecastTitle.textContent= "5-Day Forecast:";

        // append elements to forecastEl section of html 
        forecastEl.appendChild(forecastCard);
        forecastCard.appendChild(cardEl);
        cardEl.appendChild(forecastHeader);
        cardEl.appendChild(forecastBody);
        forecastBody.appendChild(forecastListTemp);
        forecastBody.appendChild(forecastListHum);
        forecastBody.appendChild(forecastListWind);
        forecastHeader.appendChild(forecastIcon);
    }
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
    
    if (document.querySelector('.forecast-card')){
        document.querySelector('#forecast').innerHTML = null;
    }
    
    getApi(currentCity);
    
})
