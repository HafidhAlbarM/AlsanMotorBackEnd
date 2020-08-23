const conn = require('../config/conn');
const response = require('../config/res');

const tableName = "pemesanan_h";
const tableDetailName = "pemesanan_d";


//HEADER

exports.getOne = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE plat_nomor='${platNomor}' AND status='LUNAS'`;

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

exports.getOneByKodePemesanan = (req, res) => {
    const kodepemesanan = req.params.kode_pemesanan;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE kode_pemesanan='${kodepemesanan}' AND status='LUNAS'`;

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
    let dataHeader = {
        "kode_pemesanan": req.body.kode_pemesanan,
        "kode_karyawan": req.body.kode_karyawan,
        "plat_nomor": req.body.plat_nomor,
        "tanggal_pemesanan": req.body.tanggal_pemesanan,
        "total_qty": req.body.total_qty,
        "total": req.body.total,
        "status": req.body.status,
        "sumber": "ANDROID"
    }
    let dataDetail = req.body.transaksi_pemesanan_detail;
    
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;
    conn.query(sqlQuery, dataHeader, (err, resQuery)=>{
        if (err){
            res.send({
                info: err
            });
        }
        else{
            dataDetail.forEach(function(data){
                let sqlQueryDetail = `INSERT INTO ${tableDetailName} SET ?`;
                conn.query(sqlQueryDetail, data, (errDtl, resQueryDetail)=>{
                    
                });
            });
            
            response.ok(resQuery, 'Data telah tersimpan, kirimkan nomor pemesanan & bukti transfer ke 085817911180', res);     
        }    
    });
}





//DETAIL

// READ (SELECT)

exports.getDetail = (req, res) => {
    const kodepemesanan = req.params.kode_pemesanan;
    let sqlQuery = `SELECT * FROM ${tableDetailName} WHERE kode_pemesanan='${kodepemesanan}'`;

    conn.query(sqlQuery, (err, resQuery) => {
        // var string=JSON.stringify(resQuery);
        // var json =  JSON.parse(string);
        if(err){
            res.send({
                info: err
            });
        } else{
            response.ok(resQuery, '', res)
        }
    });
}