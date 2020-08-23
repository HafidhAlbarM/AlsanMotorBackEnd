const conn = require('../config/conn');
const response = require('../config/res');
const md5 = require('md5');

const tableName = "userr";


//=========================================================Fungsi CRUD utama

//READ (SELECT)
exports.get = (req, res) => {
    let sqlQuery = `SELECT * FROM ${tableName}`;
    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
};

exports.getOne = (req, res) => {
    const userId = req.params.User_Id;
    let sqlQuery = `SELECT a.*, b.* FROM ${tableName} a
    INNER JOIN mobil b on a.User_Id = b.User_Id
    WHERE a.User_Id='${userId}'`;
    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
}

//CREATE (INSERT)
exports.post = (req, res) => {
    let dataInsert = {
        "User_Id": req.body.User_Id,
        "email": req.body.email,
        "Password": md5(req.body.Password),
        "Levell": req.body.Levell
    }
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;

    let message = "data telah tersimpan";
    let data = {
        dataInsert: dataInsert,
        message: message
    }

    executeQuery(req, res, sqlQuery, data);
}

//UPDATE
exports.put = (req, res) => {
    const userId = req.params.User_Id;
    let dataInsert = {
        "Password": md5(req.body.Password),
    }
    let sqlQuery = `UPDATE ${tableName} SET ? WHERE User_Id = '${userId}'`;
    data = {
        dataInsert: dataInsert,
        message: "Data berhasil dirubah"
    }

    executeQuery(req, res, sqlQuery, data);
}

//DELETE
exports.delete = (req, res) => {
    const userId = req.params.User_Id;
    let sqlQuery = `DELETE FROM ${tableName} WHERE User_Id = '${userId}'`;
    data = {
        message: "Data telah terhapus"
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