const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: "alsanmotor"
});

conn.connect((err)=>{
    if(!err){
        console.log("Berhasil terkoneksi ke database");
    }
});

module.exports = conn;