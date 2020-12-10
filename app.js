const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
// app.use(bodyParser.urlencoded({extended:true}));
dotenv.config()


var routes = require('./routes');
routes(app);


const PORT = process.env.port;
if(PORT == null || PORT == ''){
    PORT = 3000;
}

app.listen(PORT, (err)=>{
    console.log('berjalan di port ' + PORT);
});