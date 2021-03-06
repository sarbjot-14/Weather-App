console.log("script");

window.addEventListener('load',()=>{
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
            const weather = json.weather;
            const aq = json.aq;
            //update html
            const city = document.querySelector('.city')
            city.textContent = aq.results[0].location
    
    
            const current_temperature = document.querySelector('.temperature-degree')
            current_temperature.textContent = Math.round((5/9) * (parseFloat(weather.currently.temperature) - 32))
            
            const summary = document.querySelector('.temperature-discription')
            summary.textContent =  weather.currently.summary
    
            const aq_span = document.querySelector('#aq-span')
            aq_span.textContent = aq.results[0].measurements[0].value +' '+ aq.results[0].measurements[0].unit ;
    
            // call icon function to create icon

            setIcons(weather.currently.icon, document.querySelector('.icon'));
    
        });
    }
    else{
        console.log("geolocation not available");
    }

    function setIcons(icon, iconID){
        
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
