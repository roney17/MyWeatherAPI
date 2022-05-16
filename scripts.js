let input = document.getElementById('city-input');
const weatherAPI = {
    key: "464c2375e0a4473bafd195446221205",
    url: "http://api.weatherapi.com/v1/current.json?"
}

input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13){
        console.log(input.value)
        console.log(`${weatherAPI.url}key=${weatherAPI.key}&q=${input.value}`)
    }
})

function fetchWeather(city){ 
    fetch(`${weatherAPI.url}key=${weatherAPI.key}&q=${input.value}`)
        .then (current => {
            return current.json();
    })
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