//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
//Serving static files in Express
//All public files such css files and images should be placed inside a public folder in order to work in express
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const name = req.body.firstName;
    console.log(name);
    
    res.write(`<h1>Thank you for subscribing ${name}</h1>`)
    res.send();
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})