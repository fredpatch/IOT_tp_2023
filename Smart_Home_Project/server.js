const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static("./views"));

app.get("/", (req,res) => { 
    console.log("Hello")
    res.render('index');
})


const lightRouter = require('./routes/light')
app.use('/light', lightRouter)

app.listen(3002)