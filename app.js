const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

var routes = require('./routes');
routes(app);

app.listen(PORT, (err)=>{
    console.log('berjalan di port ' + PORT);
});