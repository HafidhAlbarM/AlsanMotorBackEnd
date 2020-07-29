const conn = require('../conn');
const response = require('../res');
const md5 = require('md5');

const tableName = "penjualan_h";
const tableDetailName = "penjualan_d";

//READ (SELECT)
exports.get = (req, res) => {
    let sqlQuery = `SELECT * FROM ${tableName}`;

    conn.query(sqlQuery, (err, resQuery) => {
        if(err){
            res.send({
                info: err
            });
        } else{
            response.ok(resQuery, res)
        }
    });
};

// exports.getDetail = (req, res) => {
//     let sqlQuery = `SELECT * FROM ${tableDetailName}`;

//     conn.query(sqlQuery, (err, resQuery) => {
//         if(err){
//             res.send({
//                 info: err
//             });
//         } else{
//             response.ok(resQuery, res)
//         }
//     });
// };

exports.getOne = (req, res) => {
    const kodePenjualan = req.params.kode_penjualan;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE kode_penjualan='${kodePenjualan}'`;

    conn.query(sqlQuery, (err, resQuery) => {
        var string=JSON.stringify(resQuery);
        var json =  JSON.parse(string);
        if(err){
            res.send({
                info: err
            });
        } else{
            response.ok(json[0], res)
        }
    });
}

// exports.getOneDetail = (req, res) => {
//     const kodePenjualan = req.params.kode_penjualan;
//     let sqlQuery = `SELECT * FROM ${tableDetailName} WHERE kode_penjualan='${kodePenjualan}'`;

    // conn.query(sqlQuery, (err, resQuery) => {
    //     var string=JSON.stringify(resQuery);
    //     var json =  JSON.parse(string);
    //     if(err){
    //         res.send({
    //             info: err
    //         });
    //     } else{
    //         response.ok(json[0], res)
    //     }
    // });
// }

//CREATE (INSERT)
exports.post = (req, res) => {
    // console.log(req.body);
    let dataHeader = {
        "kode_penjualan": req.body.kode_penjualan,
        "kode_karyawan": req.body.kode_karyawan,
        "plat_nomor": req.body.plat_nomor,
        "tanggal_penjualan": req.body.tanggal_penjualan,
        "total_qty": req.body.total_qty,
        "total": req.body.total,
        "status": req.body.status
    }
    let dataDetail = req.body.transaksi_penjualan_detail;
    
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;
    let executeHeader = conn.query(sqlQuery, dataHeader, (err, resQuery)=>{
        if (err){
            res.send({
                info: err
            });
        }
        else{
            dataDetail.forEach(function(data){
                let sqlQueryDetail = `INSERT INTO ${tableDetailName} SET ?`;
                executeDetail = conn.query(sqlQueryDetail, dataDetail, (errDtl, resQueryDetail)=>{
                    
                });
            });
            response.ok(resQuery, res);
        }    
    });
}

// exports.postDetail = (req, res) => {
//     let data = {
//         "kode_penjualan": req.body.kode_penjualan,
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
//             response.ok(resQuery, res)
//         }    
//     });
// }

//UPDATE
exports.put = (req, res) => {
    const kodePenjualan = req.params.kode_penjualan
    let data = {
        "kode_karyawan": req.body.kode_karyawan,
        "plat_nomor": req.body.plat_nomor,
        "tanggal_penjualan": req.body.tanggal_penjualan,
        "total_qty": req.body.total_qty,
        "total": req.body.total,
        "status": req.body.status
    }

    let sqlQuery = `UPDATE ${tableName} SET ? WHERE kode_penjualan = '${kodePenjualan}'`;
    conn.query(sqlQuery, data, (err,resQuery)=>{
        if (err){
            res.send({
                info:err
            })
        }
        else{
            response.ok(resQuery, res)
        }
    });
}

// exports.putDetail = (req, res) => {
//     const kodePenjualan = req.params.kode_penjualan;
//     const kodeProduct = req.params.kode_product;
//     let data = {
//         "kode_product": req.body.kode_product,
//         "harga": req.body.harga,
//         "qty": req.body.qty,
//         "sub_total": req.body.sub_total
//     }

//     let sqlQuery = `UPDATE ${tableName} SET ? WHERE kode_penjualan = '${kodePenjualan}'`;
//     conn.query(sqlQuery, data, (err,resQuery)=>{
//         if (err){
//             res.send({
//                 info:err
//             })
//         }
//         else{
//             response.ok(resQuery, res)
//         }
//     });
// }

//DELETE
exports.delete = (req, res) => {
    const kodePenjualan = req.params.kode_penjualan;
    let sqlQuery = `DELETE FROM ${tableName} WHERE kode_penjualan = '${kodePenjualan}'`;
    
    conn.query(sqlQuery, (err,resQuery)=>{
        if (err){
            res.send({
                info:err
            })
        }
        else{
            response.ok(resQuery, res)
        }
    });
}

// exports.deleteDetail = (req, res) => {
//     const kodePenjualan = req.params.kode_penjualan;
//     const kodeProduct = req.params.kode_product;
//     let sqlQuery = `DELETE FROM ${tableDetailName} WHERE kode_penjualan = '${kodePenjualan}' AND kode_product = ${kodeProduct}`;
    
//     conn.query(sqlQuery, (err,resQuery)=>{
//         if (err){
//             res.send({
//                 info:err
//             })
//         }
//         else{
//             response.ok(resQuery, res)
//         }
//     });
// }