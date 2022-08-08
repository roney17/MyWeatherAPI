let input = document.getElementById('city-input');
let cityName = document.getElementById('title');
let date = document.getElementById('time');
let feelsLike = document.getElementById('feelsLike');
let temp = document.getElementById('temp');
let img = document.getElementById('icon');
let todayBtn = document.getElementById('today-btn');
let forecastBtn = document.getElementById('forecast-btn');
let weatherCards = document.getElementById('weather-cards');

const weatherAPI = {
    key: "464c2375e0a4473bafd195446221205",
    url: "http://api.weatherapi.com/v1/current.json?",
    forecast: "http://api.weatherapi.com/v1/forecast.json?"
}

input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13){
        let value = input.value;
        fetchWeather(value);
        weatherCards.style.display = 'block';
    }
})

function fetchWeather(value){ 
    fetch(`${weatherAPI.url}key=${weatherAPI.key}&q=${input.value}`)
        .then (response => {
            return weather = response.json();
        })
        .then(data => {
            console.log(data);
            let currentCondition = data.current.condition.text;
            currentCondition = currentCondition.toLowerCase();
            console.log(currentCondition);
            if (currentCondition.includes('rain')) {
                document.body.className = 'rainy';
            } else if (currentCondition.includes('sun') || currentCondition.includes('clear')) {
                document.body.className = 'sunny';
            } else if (currentCondition.includes('cloud') || currentCondition.includes('overcast')) {
                document.body.className = 'cloudy';
            } else if (currentCondition.includes('lightning')) {
                document.body.className = 'lightning';
            } 
            if (data.current.is_day == '0') {
                document.body.className = 'night';
                document.getElementById('intro').className = 'white';
            } else {
                document.getElementById('intro').className = 'black';
            }
            cityName.innerHTML = `${data.location.name}`;
            //splice the date to get the time
            let currentTime = data.location.localtime.split(' ');
            currentTime = currentTime[1];
            date.innerHTML = `${currentTime}`;
            // date.innerHTML = `${data.location.localtime}`;
            feelsLike.innerHTML = `Feels Like ${data.current.feelslike_f} F `;
            temp.innerHTML = `${data.current.temp_f} F`;
            icon.src = `${data.current.condition.icon}`;
            document.getElementById('weather-cards').style.display = 'block';
            
        }).then ();
    }

    //declare a function to toggle between today and forecast
    function toggle() {
        if (todayBtn.classList.contains('active')) {
            forecastBtn.classList.add('active');
            todayBtn.classList.add('btn-primary');
            forecastBtn.classList.add('btn-secondary');
            todayBtn.classList.remove('active', 'btn-secondary');
        } else {
            forecastBtn.classList.remove('active', 'btn-secondary');
            todayBtn.classList.add('active');
            forecastBtn.classList.add('btn-primary');
            todayBtn.classList.add('btn-secondary');
            forecast();
        }
    }
    //declare a function to fetch the forecast
    function forecast() {
        fetch(`${weatherAPI.forecast}key=${weatherAPI.key}&q=${input.value}`)

            .then (response => {
                return weather = response.json();
            }
            )
            .then(data => {
                console.log(data);
                
                }
            ).then ();
    }
    // function forecast(value){ 
    //     fetch(`${weatherAPI.forecast}key=${weatherAPI.key}&q=provo`)
    //         .then (response => {
    //             return forecast = response.json();
    //             console.log(forecast);
    //         })
            // .then(data => {
            //     console.log(data);
            //     cityName.innerHTML = `${data.location.name}`;
            //     feelsLike.innerHTML = `Feels Like ${data.current.feelslike_f} F `;
            //     temp.innerHTML = `${data.current.temp_f} F`;
            //     icon.src = `${data.current.condition.icon}`;
            //     document.getElementById('weather-cards').style.display = 'block';
            // }).then ();
    // function toggleToday() {
    //     todayBtn.classList.toggle("btn-secondary");
    //     console.log("hello;")
    //   };
    //   function toggleForecast() {
    //     forecastBtn.classList.toggle("btn-secondary");
    //     console.log("hello;")
    //   };
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