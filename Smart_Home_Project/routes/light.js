const express = require('express')
const router = express.Router()

//Johnny-five module
const { Board, Led, Sensor } = require("johnny-five");
const board = new Board({port:"COM7"});

const data = []
let average = 0;

board.on("ready", () => {
    console.log("board ready");

    //sensor connected to pin A0
    const sensor = new Sensor({pin:'A0',freq:250});

    //led connected to pin 13
    const led = new Led(13);

    //determine the average
    sensor.on("data", function() {
        ldrValue2 = sensor.value

        //aggregation
        if(data.length == 10) {
            data.shift();}

            data.push(sensor.value);
            let sum = data.reduce((acc, val) => acc + val, 0);
            average = sum / data.length;
            console.log('Sensor value: ' + data + " || Average : " + average);
    });

    router.get('/manual', (req, res) => {
        //enable the function
        sensor.enable();
        //stop the blinking
        led.stop();

        // When the sensor value changes, log the value
        sensor.on("change", value => {
        console.log("Sensor: ");
        console.log("  value  : ",  (sensor.value / 1024) * 100 + " %" /*value for the sensor*/);
        console.log("-----------------");

            if(sensor.value < 250){
                led.on();
            }else{
                led.off();
            }
        });
        res.send('Ok, manual');
    })


    //automatic function
    router.get('/auto', (req, res) => {

        //stop the sensor when switching method
        sensor.disable();

        //the led will be on
        led.on();
        //response
        res.send('Ok, auto');
    })


    /*Sun up and Down Actions*/
    //When the sun in down, turn on the light
    router.get('/sun_down', (req, res) => {
        //enable the function
        sensor.enable();
        //stop the blinking
        led.stop();

        // When the sensor value changes, log the value
        sensor.on("change", value => {
        console.log("Sensor: ");
        console.log("  value  : ",  (sensor.value / 1024) * 100 + " %" /*value for the sensor*/);
        console.log("-----------------");

            if(sensor.value < 250){
                led.on();
            }else{
                led.off();
            }
        });
        res.send('The Sun Is Now Down, The Light Will Turn On based on the Brightness');
    })
    
    //When the sun is up change the light state to work based on user interaction
    router.get('/sun_up', (req, res) => {

        //stop the sensor when switching method
        sensor.disable();

        //the led will be on
        led.on();
        //response
        res.send('Good Morning, The SUN is now UP and the Light will go OFF');
    })

})

router.get("/sensor", (req,res) => { 
    res.json({ average: parseFloat( ((average/1000)*100)).toFixed(2)});
})




module.exports = router