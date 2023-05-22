

function getApi(city) {
    
    var apiKey = "270870f74b0a4167c2dabb9a30b68d16" 
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + "&units=imperial";

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        var coord = data.coord; 
        console.log(data);
        console.log(coord);
        
    })

}

document.getElementById('search-btn').addEventListener('click', function(event){
    event.preventDefault();
    var input = document.getElementById('TextInput').value;
    localStorage.setItem('city', JSON.stringify(input));
    var city = JSON.parse(localStorage.getItem('city'))
    console.log(city); 
    getApi(city);
})
