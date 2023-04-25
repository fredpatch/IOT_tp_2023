
//express server declaration and initialization
//Requiring the module
const express = require('express')
const app = express()

//port declaration
const port = 3000;

//Johnny-five module
const { Board, Led, Sensor } = require("johnny-five");
const board = new Board({port:"COM7"});

//public static route
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

//route handling
app.get('/',(req,res) => {
    res.sendFile('index.html');
});


//board initialization
board.on("ready", () => {
    console.log("board ready");

  //sensor connected to pin A0
  const sensor = new Sensor("A0");

  //led connected to pin 13
  const led = new Led(13);

    //when calling route for manual button, make the led blink
    app.post('/manual', (req, res) => {
        //enable the function
        sensor.enable();
        //stop the blinking
        led.stop();

        // When the sensor value changes, log the value
        sensor.on("change", value => {
        console.log("Sensor: ");
        console.log("  value  : ",  (sensor.value / 1024) * 100 + " %" /*value for the sensor*/);
        console.log("-----------------");

            if(sensor.value < 400){
                led.on();
            }else{
                led.off();
            }
        });
        res.send('Ok, manual');
    });

    app.post('/auto', (req, res) => {

        //stop the sensor when switching method
        sensor.disable();

        // "blink" the led in 500ms on-off phase periods
        led.blink(500);
        //response
        res.send('Ok, auto');

    });

})

//get the value of the sensor, to display for the user
app.get('/sensor',(req, res) => {
    res.json({
        sensor: parseFloat( ((sensor?.value / 1024) * 100)+'').toFixed(2)
    });
});


//Server setup
app.listen(port, () => {
    console.log("Web Server Started go to http://localhost:3000 ")
})