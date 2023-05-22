var city = "Knoxville"

function getApi() {
   
    var apiKey = "270870f74b0a4167c2dabb9a30b68d16" 
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })

}

getApi();