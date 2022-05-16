let input = document.getElementById('city-input');
let cityName = document.getElementById('title');
let feelsLike = document.getElementById('feelsLike');
let temp = document.getElementById('temp');
let img = document.getElementById('icon');
const weatherAPI = {
    key: "464c2375e0a4473bafd195446221205",
    url: "http://api.weatherapi.com/v1/current.json?"
}

input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13){
        let value = input.value;
        fetchWeather(value);

    }
})

function fetchWeather(value){ 
    console.log(value);
    fetch(`${weatherAPI.url}key=${weatherAPI.key}&q=${input.value}`)
        .then (response => {
            return weather = response.json();
        })
        .then(data => {
            console.log(data);
            cityName.innerHTML = `${data.location.name}`;
            feelsLike.innerHTML = `Feels Like ${data.current.feelslike_f}`;
            temp.innerHTML = `${data.current.temp_f}`;
            icon.src = `${data.current.condition.icon}`;
            document.getElementById('weather-cards').style.display = 'block';
            


            
        }).then ();
    }


// console.log(input);





// const http = require('http');

// http.get(
//     "http://api.weatherapi.com/v1/current.json?key=464c2375e0a4473bafd195446221205&q=84604&aqi=no", (response)=>{
//     let data = '';
//     response.on('data', chunk => data += chunk)

//     response.on('end', () => {
//         console.log(JSON.parse(data));
//     });
//     // let city = response.location;
//     // console.log(city);
// }).on('error', (err) => {
//     console.log(err);
// })