console.log("script");

if('geolocation' in navigator){
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latty =position.coords.latitude
        const longy =position.coords.longitude 
        //get weather 
        //const api_url = `weather/`
        const api_url = `weather/${latty},${longy}`
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
        weather = json.weather;
        aq = json.aq;
        //update html
        const location = document.querySelector('#location')
        location.textContent = aq.results[0].location


        const current_temperature = document.querySelector('#current-temperature')
        current_temperature.textContent = Math.round((5/9) * (parseFloat(weather.currently.temperature) - 32))
        
        const summary = document.querySelector('#current-summary')
        summary.textContent =  weather.currently.summary

        const aq_span = document.querySelector('#aq-span')
        aq_span.textContent = aq.results[0].measurements[0].value +' '+ aq.results[0].measurements[0].unit ;


        /*
        // send coords to server and get weather in return
        const data = {latty, longy};
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        const serverResp  = await fetch('/coords',options )
        const serverData = await serverResp.json();
        console.log(serverData);
        */
    });
}
else{
    console.log("geolocation not available");
}