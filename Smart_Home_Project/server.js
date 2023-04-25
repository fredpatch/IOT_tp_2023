const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static("./views"));

app.get("/", (req,res) => { 
    console.log("Server Running On localhost:3002")
    res.render('index');
})

//set the routes
const lightRouter = require('./routes/light')
app.use('/light', lightRouter)
//listening port
app.listen(3002)