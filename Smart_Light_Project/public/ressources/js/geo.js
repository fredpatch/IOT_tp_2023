let sunrise;
let sunset;
let sunriseStr, sunsetStr, strTime;
let time = new Date(Date.now());

function auto_on_off() {
 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let positionInfo = "Current Position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
            document.getElementById("result").innerHTML = positionInfo;
            fetch(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&date=today`,
                {
                    method: 'GET',
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    sunrise = data.results.sunrise.split(" ")[0];
                    sunset = data.results.sunset.split(" ")[0];
                    console.log(time.toTimeString().split(" ")[0]);

                    //convert values in miliseconds to facilitate the comparison
                    sunriseStr =  sunrise.split(':');
                    sunsetStr =  sunset.split(':');
                    strTime =  time.toTimeString().split(" ")[0].split(':');

                    totalSeconds1 = parseInt(sunriseStr[0] * 3600 + sunriseStr[1] * 60 + sunriseStr[0]);
                    totalSeconds2 = parseInt(sunsetStr[0] * 3600 + sunsetStr[1] * 60 + sunsetStr[0]);
                    totalSeconds3 = parseInt(strTime[0] * 3600 + strTime[1] * 60 + strTime[0]);

                    console.log("Sunrise value : " + sunrise + "Sunset value : " + sunset);

                    //compare value to turn on/off light based on the time of the day
                    if(totalSeconds1 < strTime && totalSeconds2 > strTime){
                        /*if the sunrise value is less than the actual time and the sunset time is greater than actual time; means that the sun is still sleeping
                        and so, the light will be put on auto; meaning at night time the light will turn on
                        when either detecting a mouvement, or set in a dark place*/
                        fetch(baseUri+'/manual;',
                            {
                                method: 'POST',
                            })
                            .then((res) => {
                                return res.text();
                            })
                            .then((data) => console.log(data))
                            .catch(function (err) {
                                console.log(err)
                            });
                    }else{
                        //Set the light on auto during the day; making the led blink
                        fetch(baseUri+'/auto',
                            {
                                method: 'POST',
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