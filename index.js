const express = require('express')
const app = express();
const fetch = require('node-fetch')
app.use(express.static('public'))
app.use(express.json({limit: '1mb'})); 

/*
app.post('/coords', (req, res) => {
    console.log("req received")
    console.log(req.body);
    const data = req.body
    const timestamp = Date.now();
    data.timestamp = timestamp;
    data.status = 'success'
    res.json(data)

});
*/

app.get('/weather/:latlong',async (req, res) => {
    const latlon = req.params.latlong.split(',')
    const lon = latlon[1]
    const lat = latlon[0]
    //get weather data from dark sky
    const weather_url = `https://api.darksky.net/forecast/796872e634fe99be890e67d020299cf6/${lat},${lon}`;
    const weather_response = await fetch(weather_url);
    const weather_json = await weather_response.json();
    console.log(weather_json)

    //get air quality info 
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_json = await aq_response.json();
    
    const data ={
        weather: weather_json,
        aq: aq_json
    }

    res.json(data);
});



app.listen(3000, () => { console.log("listening at 3000")})

