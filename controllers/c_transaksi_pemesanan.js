const conn = require('../config/conn');
const response = require('../config/res');

const tableName = "pemesanan_h";
const tableDetailName = "pemesanan_d";


//HEADER

exports.get = (req, res) => {
    const platNomor = req.params.plat_nomor;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE plat_nomor='${platNomor}' AND status='LUNAS'`;

    let data = {
        message: "berhasil menampilkan data"
    }

    executeQuery(req, res, sqlQuery, data);
};


exports.getOne = (req, res) => {
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
    let sqlQuery = "SELECT pemesanan FROM jumlah";
    let kodePemesanan = "";
    let dataHeader = {};
    conn.query(sqlQuery, (err, resQuery)=>{
        if(err){
            res.send({
                info: err
            });
        }else{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            //Generate Kode Pemesanan
            let maxCode = resQuery[0].pemesanan + 1;
            kodePemesanan = "PM" + dd + mm + yyyy + ("00000" + maxCode).slice(-3);

            dataHeader = {
                "kode_pemesanan": kodePemesanan,
                "kode_karyawan": req.body.kode_karyawan,
                "plat_nomor": req.body.plat_nomor,
                "tanggal_pemesanan": req.body.tanggal_pemesanan,
                "total_qty": req.body.total_qty,
                "total": req.body.total,
                "status": req.body.status,
                "sumber": "ANDROID"
            }
            
            let dataDetail = req.body.transaksi_pemesanan_detail;
           
            for (let key in dataDetail) {
                dataDetail[key].kode_pemesanan = kodePemesanan;
            }

            //INSERT HEADER
            sqlQuery = `INSERT INTO ${tableName} SET ?`;
            conn.query(sqlQuery, dataHeader, (err, resQuery)=>{
                if (err){
                    res.send({
                        info: err
                    });
                }
                else{
                    //INSERT DETAIL
                    dataDetail.forEach(function(data){
                        let sqlQueryDetail = `INSERT INTO ${tableDetailName} SET ?`;
                        conn.query(sqlQueryDetail, data, (errDtl, resQueryDetail)=>{
                            
                        });
                    });
                    
                    //UPDATE JUMLAH PEMESANAN
                    sqlQuery = "UPDATE jumlah set pemesanan = pemesanan+1";
                    conn.query(sqlQuery, (err, resQuery)=>{
                        if(err){
                            res.send({
                                info: err
                            });
                        }else{
                            response.ok(resQuery, 'Data telah tersimpan, kirimkan nomor pemesanan & bukti transfer ke 085817911180', res);
                        }
                    });          
                }    
            });
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