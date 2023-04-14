//Router for our operations
const express = require('express')
const router = express.Router()
const app = express()

//view engine
app.set('view engine', 'ejs') 

//Johnny-five module
const { Board, Led, Sensor } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    //led connected to pin 13
  const led = new Led(13);
  //sensor connected to pin A0
  const sensor = new Sensor("A0");

  //when calling route for manual button, make the led blink
  app.post('/manual', (req, res) => {

            // When the sensor value changes, log the value
            sensor.on("change", value => {
            console.log("Sensor: ");
            console.log("  value  : ",  (sensor.value / 1024) * 100 /* % value for the sensor*/);
            console.log("-----------------");

            if(sensor.value < 300){
                led.on();
            }else{
                led.off();
            }
        });
        res.send('Ok, manual');
    });

    //when pressing auto, activate autopilot for the led app
    app.post('/auto', (req, res) => {
        
        // "blink" the led in 500ms on-off phase periods
        led.blink(500);
        //response
        res.send('Ok, auto');
    });

    //get the value of the sensor, to display for the user
    /*
    app.get('/sensor',(req, res) => {
        res.json({
            sensor: parseFloat( ((sensor?.value / 1024) * 100)+'').toFixed(2)
        });
    });*/

    app.get('/sensor',(req,res) => {
        console.log("printing sensor value on index");
        res.render("index", {sensorValue: ((sensor.value / 1024) * 100).toFixed(2)});
    })

});

module.exports = router