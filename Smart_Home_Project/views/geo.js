let sunrise;
let sunset;
let local_time;

const sunrise_time = document.querySelector('#sunrise-time');
const sunset_time = document.querySelector('#sunset-time');
const viewer = document.querySelector('#view-info');
const baseUri = 'http://localhost:3002';

let time = new Date(Date.now());

function auto_on_off() {
 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let positionInfo = "Current Position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
            document.getElementById("result").innerHTML = positionInfo;
            fetch(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&date=today&formatted=0`,
                {
                    method: 'GET',
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    
                    sunrise = data.results.sunrise.split(" ")[0];
                    const time_sunrise = new Date(sunrise).toLocaleTimeString('en',
                    { timeStyle: 'short', hour12: false, timeZone: 'UTC' })

                    sunset = data.results.sunset.split(" ")[0];
                    const time_sunset = new Date(sunset).toLocaleTimeString('en',
                    { timeStyle: 'short', hour12: false, timeZone: 'UTC' })

                    local_time = time.toTimeString().split(" ")[0];
                    console.log(`Actual time : ${local_time}`);
                    console.log(`Sunrise Time : ${sunrise} and Sunset Time : ${sunset}`)

                    //insert value in our html visual
                    sunrise_time.innerHTML = time_sunrise;
                    sunset_time.innerHTML = time_sunset;

                    //comparing value
                    if(time_sunrise < local_time && time_sunset > local_time){
                        //When sun is up, change the viewer text
                        viewer.innerHTML = "SUN UP";

                        fetch(baseUri+'/light/sun_up',
                            {
                                method: 'GET',
                            })
                            .then((res) => {
                                return res.text();
                            })
                            .then((data) => console.log(data))
                            .catch(function (err) {
                                console.log(err)
                        });

                    }else{
                        //And when sun down, change accordingly
                        viewer.innerHTML = "SUN DOWN";

                        fetch(baseUri+'/light/sun_down',
                            {
                                method: 'GET',
                            })
                            .then((res) => {
                                return res.text();
                            })
                            .then((data) => console.log(data))
                            .catch(function (err) {
                                console.log(err)
                        });
                    }

                })
                .catch(function (err) {
                    console.log(err)
                });
        });
    } else {
        alert("Change Browser man.");
    }

}

document.addEventListener('DOMContentLoaded', function () {
    
    auto_on_off();
});