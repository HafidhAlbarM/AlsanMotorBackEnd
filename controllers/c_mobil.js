const conn = require('../config/conn');
const response = require('../config/res');

const tableName = "mobil";


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
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE plat_nomor='${platNomor}'`;
    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
}

//CREATE (INSERT)
exports.post = (req, res) => {
    let dataInsert = {
        "plat_nomor": req.body.plat_nomor,
        "merk_mobil": req.body.merk_mobil,
        "nama_mobil": req.body.nama_mobil,
        "pemilik": req.body.pemilik,
        "jenis": req.body.jenis,
        "jumlah_cuci": req.body.jumlah_cuci
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
    const platNomor = req.params.plat_nomor;
    let dataInsert = {
        "merk_mobil": req.body.merk_mobil,
        "nama_mobil": req.body.nama_mobil,
        "pemilik": req.body.pemilik,
        "jenis": req.body.jenis,
        "jumlah_cuci": req.body.jumlah_cuci
    }
    let sqlQuery = `UPDATE ${tableName} SET ? WHERE plat_nomor = '${platNomor}'`;
    data = {
        dataInsert: dataInsert,
        message: "Data berhasil dirubah"
    }

    executeQuery(req, res, sqlQuery, data);
}

//DELETE
exports.delete = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `DELETE FROM ${tableName} WHERE plat_nomor = '${platNomor}'`;
    data = {
        message: "Data telah terhapus"
    }
    
    executeQuery(req, res, sqlQuery);
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