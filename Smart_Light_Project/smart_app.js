
//express server declaration and initialization
//Requiring the module
const express = require('express')
const app = express()

//port declaration
const port = 3000

//route handling
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//require the route to the operations
const operationRouter = require('./routes/operation')

//Link our router to the main server
app.use('/index',operationRouter);

//Server setup
app.listen(port, () => {
    console.log('Web Server Started go to http://localhost:${port}')
})