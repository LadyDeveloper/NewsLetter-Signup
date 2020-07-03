//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
//Serving static files in Express
//All public files such css files and images should be placed inside a public folder in order to work in express
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
 
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //Turns the data into a format of string that is in the format of JSON -- this is the opposite of JSON.parse(data)
    const jsonData = JSON.stringify(data);
     //The url is the on https://mailchimp.com/developer/guides/get-started-with-mailchimp-api-3/ Request body parameters documentations (--url 'https://usX.api.mailchimp.com/3.0/lists' \ )
     // The list id is located in https://us10.admin.mailchimp.com/lists/settings
     // The usX in the url is the origin and is replaced by the number after the ( - ) in the API Key aedf6ba237610f958adc17e987344fa3-us10
    const url = 'https://us10.api.mailchimp.com/3.0/lists/641260ae8c';
    
    // The options varible is create to fullfil the https.request(url[, options][, callback]) parameters ( https://nodejs.org/api/http.html#http_http_request_options_callback )
    /* 
    Exemple extracted from https://nodejs.org/api/http.html#http_http_request_options_callback
    const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
        }
    };

    */
    
    const options = {
        //method <string> A string specifying the HTTP request method. Default: 'GET'.
        method: "POST",
        //auth <string> Basic authentication i.e. 'user:password' to compute an Authorization header.
        auth: "ladydeveloper:aedf6ba237610f958adc17e987344fa3-us10"
    }
    //The https.request is saved into a variable (in this case called request) to be sent to mailchimp later
    const request = https.request( url, options, (response) => {

        if (response.statusCode === 200){
            res.sendFile(__dirname +  "/success.html");
        } else {
            res.sendFile(__dirname +  "/failure.html");
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));   
        })
    });

    request.write(jsonData);
    request.end();

});

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
    
})

//Mailchimp
//API Key
// aedf6ba237610f958adc17e987344fa3-us10

//Audience/List ID
// 641260ae8c