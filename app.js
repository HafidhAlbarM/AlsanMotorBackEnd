const express = require('express');
const PORT = 3000;
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

app.listen(PORT, (err)=>{
    console.log('berjalan di port ' + PORT);
});