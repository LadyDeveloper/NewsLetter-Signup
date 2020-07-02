const express = require("express")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})