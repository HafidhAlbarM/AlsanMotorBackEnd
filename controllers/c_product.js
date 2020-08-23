const conn = require('../config/conn');
const response = require('../config/res');
const md5 = require('md5');

const tableName = "product";

//READ (SELECT)
exports.get = (req, res) => {
    let sqlQuery = `SELECT * FROM ${tableName} WHERE Kode_Kategori <> 'JSA'`;
    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
};

exports.getOne = (req, res) => {
    const kodeProduct = req.params.Kode_Product;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE Kode_Product='${kodeProduct}'`;
    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
}

//=========================================================kalo butuh login lain, bisa nambah baru dibawah ini



//==================================================================================================================

// Fungsi
function executeQuery(req, res, sqlQuery, data){
    conn.query(sqlQuery, 
              (data) ? data.dataInsert : '', 
              (err, resQuery) => {
                    if(err){
                        res.send({
                            info: err
                        });
                    } else{
                        console.log(resQuery);
                        response.ok((resQuery == '' ? 'Tidak ada data' : resQuery), (data) ? data.message : '', res);
                    }
              });
}