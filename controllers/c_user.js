const conn = require('../conn');
const response = require('../res');
const md5 = require('md5');

const tableName = "userr";

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

exports.getOne = (req, res) => {
    const userId = req.params.User_Id;
    let sqlQuery = `SELECT * FROM ${tableName} WHERE User_Id='${userId}'`;

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

//CREATE (INSERT)
exports.post = (req, res) => {
    let data = {
        "User_Id": req.body.User_Id,
        "email": req.body.email,
        "Password": md5(req.body.Password),
        "Levell": req.body.Levell
    }
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;

    conn.query(sqlQuery, data, (err, resQuery)=>{
        if (err){
            res.send({
                info: err
            });
        }
        else{
            response.ok(resQuery, res)
        }    
    });
}

//UPDATE
exports.put = (req, res) => {
    const userId = req.params.User_Id;
    let data = {
        "Password": req.body.Password,
    }

    let sqlQuery = `UPDATE ${tableName} SET ? WHERE User_Id = '${userId}'`;
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

//DELETE
exports.delete = (req, res) => {
    const userId = req.params.User_Id;
    let sqlQuery = `DELETE FROM ${tableName} WHERE User_Id = '${userId}'`;
    
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