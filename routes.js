module.exports = function(app){
    const controllerUser = require('./controllers/c_user');
    const controllerProduct = require('./controllers/c_product');
    const controllerTransaksiPemesanan = require("./controllers/c_transaksi_pemesanan");

    //REGISTER
    app.route("/user/register/").post(controllerUser.postOneUserAuth);

    //LOGIN
    app.route("/user/login/").post(controllerUser.getOneUserAuth);
    
    //PROFILE
    app.route("/user/:User_Id").get(controllerUser.getOne);
    
    //PRODUCT
    app.route("/product").get(controllerProduct.get);
    app.route("/product/:Kode_Product").get(controllerProduct.getOne);
    
    //TRANSAKSI
    app.route("/transaksi_pemesanan").post(controllerTransaksiPemesanan.post);
    app.route("/transaksi_pemesanan/:plat_nomor").get(controllerTransaksiPemesanan.get);
    app.route("/transaksi_pemesanan_by_kode_pemesanan/:kode_pemesanan").get(controllerTransaksiPemesanan.getOne);
    app.route("/transaksi_pemesanan/get_detail/:kode_pemesanan").get(controllerTransaksiPemesanan.getDetail);
}