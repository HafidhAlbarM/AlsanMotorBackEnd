const conn = require('../conn');
const response = require('../res');

const tableName = "mobil";

//READ (SELECT)
exports.get = (req, res) => {
    let sqlQuery = `SELECT * FROM ${tableName}`;

    conn.query(sqlQuery, (err, resQuery) => {
        if(err){
            res.send({
                info: err
            });
        } else{
            response.ok(resQuery, '', res)
        }
    });
};

exports.getOne = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE plat_nomor='${platNomor}'`;

    conn.query(sqlQuery, (err, resQuery) => {
        var string=JSON.stringify(resQuery);
        var json =  JSON.parse(string);
        if(err){
            res.send({
                info: err
            });
        } else{
            response.ok(json[0], '', res)
        }
    });
}

//CREATE (INSERT)
exports.post = (req, res) => {
    let data = {
        "plat_nomor": req.body.plat_nomor,
        "merk_mobil": req.body.merk_mobil,
        "nama_mobil": req.body.nama_mobil,
        "pemilik": req.body.pemilik,
        "jenis": req.body.jenis,
        "jumlah_cuci": req.body.jumlah_cuci
    }
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;

    conn.query(sqlQuery, data, (err, resQuery)=>{
        if (err){
            res.send({
                info: err
            });
        }
        else{
            response.ok(resQuery, 'data telah tersimpan', res)
        }    
    });
}

//UPDATE
exports.put = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let data = {
        "merk_mobil": req.body.merk_mobil,
        "nama_mobil": req.body.nama_mobil,
        "pemilik": req.body.pemilik,
        "jenis": req.body.jenis,
        "jumlah_cuci": req.body.jumlah_cuci
    }

    let sqlQuery = `UPDATE ${tableName} SET ? WHERE plat_nomor = '${platNomor}'`;
    conn.query(sqlQuery, data, (err,resQuery)=>{
        if (err){
            res.send({
                info:err
            })
        }
        else{
            response.ok(resQuery, 'Data telah tersimpan', res)
        }
    });
}

//DELETE
exports.delete = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `DELETE FROM ${tableName} WHERE plat_nomor = '${platNomor}'`;
    
    conn.query(sqlQuery, (err,resQuery)=>{
        if (err){
            res.send({
                info:err
            })
        }
        else{
            response.ok(resQuery, 'Data telah terhapus', res)
        }
    });
}