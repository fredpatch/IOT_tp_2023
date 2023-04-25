//Router for our operations
const express = require('express');
const router = express.Router();
//const app = express();

//Johnny-five module
const { Board, Led, Sensor } = require("johnny-five");
const board = new Board({port:"COM7"});

board.on("ready", () => {
 //led connected to pin 13
 const led = new Led(13);
 //sensor connected to pin A0
 const sensor = new Sensor("A0");

 //when calling route for manual button, make the led blink
 router.post('/manual', (req, res) => {

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
})

module.exports = router