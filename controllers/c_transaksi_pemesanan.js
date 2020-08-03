const conn = require('../config/conn');
const response = require('../config/res');

const tableName = "pemesanan_h";
const tableDetailName = "pemesanan_d";


//HEADER

//READ (SELECT)
// exports.get = (req, res) => {
//     let sqlQuery = `SELECT * FROM ${tableName}`;

//     conn.query(sqlQuery, (err, resQuery) => {
//         if(err){
//             res.send({
//                 info: err
//             });
//         } else{
//             response.ok(resQuery, '', res)
//         }
//     });
// };

exports.getOne = (req, res) => {
    const kodepemesanan = req.params.kode_pemesanan;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE kode_pemesanan='${kodepemesanan}'`;

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

//UPDATE
// exports.put = (req, res) => {
//     const kodepemesanan = req.params.kode_pemesanan
//     let data = {
//         "kode_karyawan": req.body.kode_karyawan,
//         "plat_nomor": req.body.plat_nomor,
//         "tanggal_pemesanan": req.body.tanggal_pemesanan,
//         "total_qty": req.body.total_qty,
//         "total": req.body.total,
//         "status": req.body.status,
//         "sumber": req.body.sumber
//     }

//     let sqlQuery = `UPDATE ${tableName} SET ? WHERE kode_pemesanan = '${kodepemesanan}'`;
//     conn.query(sqlQuery, data, (err,resQuery)=>{
//         if (err){
//             res.send({
//                 info:err
//             })
//         }
//         else{
//             response.ok(resQuery, 'Data telah tersimpan', res)
//         }
//     });
// }

//DELETE
// exports.delete = (req, res) => {
//     const kodepemesanan = req.params.kode_pemesanan;
//     let sqlQuery = `DELETE FROM ${tableName} WHERE kode_pemesanan = '${kodepemesanan}'`;
    
//     conn.query(sqlQuery, (err,resQuery)=>{
//         if (err){
//             res.send({
//                 info:err
//             })
//         }
//         else{
//             response.ok(resQuery, 'Data telah terhapus', res)
//         }
//     });
// }



//DETAIL

// READ (SELECT)
exports.getDetail = (req, res) => {
    let sqlQuery = `SELECT * FROM ${tableDetailName}`;

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

exports.getOneDetail = (req, res) => {
    const kodepemesanan = req.params.kode_pemesanan;
    let sqlQuery = `SELECT * FROM ${tableDetailName} WHERE kode_pemesanan='${kodepemesanan}'`;

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

//INSERT
// exports.postDetail = (req, res) => {
//     let data = {
//         "kode_pemesanan": req.body.kode_pemesanan,
//         "kode_product": req.body.kode_product,
//         "harga": req.body.harga,
//         "qty": req.body.qty,
//         "sub_total": req.body.sub_total
//     }
//     let sqlQuery = `INSERT INTO ${tableDetailName} SET ?`;

//     conn.query(sqlQuery, data, (err, resQuery)=>{
//         if (err){
//             res.send({
//                 info: err
//             });
//         }
//         else{
//             response.ok(resQuery, 'Data telah tersimpan', res)
//         }    
//     });
// }


//UPDATE
// exports.postDetail = (req, res) => {
//     const kodepemesanan = req.params.kode_pemesanan;
//     const kodeProduct = req.params.kode_product;
//     let data = {
//         "qty": req.body.qty,
//         "sub_total": req.body.sub_total
//     }
//     let sqlQuery = `UPDATE ${tableDetailName} SET ? WHERE kode_pemesanan='${kodepemesanan}' AND kode_product='${kodeProduct}'`;

//     conn.query(sqlQuery, data, (err, resQuery)=>{
//         if (err){
//             res.send({
//                 info: err
//             });
//         }
//         else{
//             response.ok(resQuery, 'Data telah tersimpan', res)
//         }    
//     });
// }


// DELETE
// exports.deleteDetail = (req, res) => {
//     const kodepemesanan = req.params.kode_pemesanan;
//     const kodeProduct = req.params.kode_product;
//     let sqlQuery = `DELETE FROM ${tableDetailName} WHERE kode_pemesanan = '${kodepemesanan}' AND kode_product = ${kodeProduct}`;
    
//     conn.query(sqlQuery, (err,resQuery)=>{
//         if (err){
//             res.send({
//                 info:err
//             })
//         }
//         else{
//             response.ok(resQuery, 'Data telah terhapus', res)
//         }
//     });
// }