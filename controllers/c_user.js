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

exports.postOneUserAuth = (req, res) => {
    return new Promise((resolve, reject) => {
        let email = req.body.email;
        let sqlQuery = `SELECT*FROM ${tableName} WHERE email='${email}'`;
        conn.query(sqlQuery, (err, resQuery)=>{
            if(!err){
                if(resQuery.length>0){
                    reject(
                        res.json({
                            success: false,
                            info:"Email sudah digunakan"
                        })
                    )
                }else{
                    const dataUser = {
                        'User_Id': req.body.User_Id,
                        'email': req.body.email,
                        'Password': md5(req.body.Password),
                        "Levell": 3
                    }

                    sqlQuery = `INSERT INTO ${tableName} SET ?`;
                    conn.query(sqlQuery, dataUser, (err, resQuery)=>{
                        if(err){
                            reject(
                                res.send({
                                    success: false,
                                    info: err
                                })
                            );
                        }else{
                            const dataMobil = {
                                'plat_nomor': req.body.plat_nomor,
                                'merk_mobil': req.body.merk_mobil,
                                'nama_mobil': req.body.nama_mobil,
                                'pemilik': req.body.pemilik,
                                'alamat': req.body.alamat,
                                'jenis': "Langganan",
                                'jumlah_cuci': 0,
                                "User_Id": req.body.User_Id
                            }

                            sqlQuery = `INSERT INTO mobil SET ?`;
                            conn.query(sqlQuery, dataMobil, (err, resQuery)=>{
                                if(err){
                                    reject(
                                        res.send({
                                            success: false,
                                            info: err
                                        })
                                    )
                                }else{
                                    resolve(
                                        response.ok(resQuery, 'Registrasi berhasil', res)
                                    );
                                }
                            });
                        }
                    });
                }
            }else{
                reject(
                    res.send(err)
                );
            }
        });
    });
}

exports.getOneUserAuth = (req, res) => {
    const userId = req.body.User_Id;
    const password = md5(req.body.Password);
    let sqlQuery = `SELECT a.*, b.* FROM ${tableName} a
                    INNER JOIN mobil b on a.User_Id = b.User_Id
                    WHERE a.User_Id='${userId}' or a.email='${userId}' and a.Password='${password}'`;

    conn.query(sqlQuery, (err, resQuery) => {
              if(err){
                  res.send({
                      success: false,
                      info: err
                  });
              } else{
                  let message="";
                  if(resQuery.length>0){
                      message=`Selamat datang ${resQuery[0].User_Id}`;
                  }else{
                      message="User ID/Password salah";
                  }
                  response.ok(resQuery,message, res);
              }
        });
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

    let data = {
        dataInsert: dataInsert,
        message: "data telah tersimpan"
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
                            success: false,
                            info: err
                        });
                    } else{
                        console.log(resQuery);
                        response.ok((resQuery == '' ? 'Tidak ada data' : resQuery), (data) ? data.message : '', res);
                    }
              });
}