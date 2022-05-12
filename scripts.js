const https = require('https');

key = "464c2375e0a4473bafd195446221205";

https.get(`https://api.weatherapi.com/v1/current.json?key=${key}=&q=84604`, (response)=>{
    let data = '';
    response.on('data', chunk => data += chunk)

    response.on('end', () => {
        console.log(JSON.parse(data));
    });

}).on('error', (err) => {
    console.log(err);
})