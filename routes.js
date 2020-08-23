module.exports = function(app){
    const controllerUser = require('./controllers/c_user');
    const controllerProduct = require('./controllers/c_product');
    const controllerTransaksiPemesanan = require("./controllers/c_transaksi_pemesanan");

    app.route("/user/:User_Id").get(controllerUser.getOne);

    //PRODUCT
    app.route("/product").get(controllerProduct.get);
    app.route("/product/:Kode_Product").get(controllerProduct.getOne);
    
    //TRANSAKSI YANG SELSAI
    app.route("/transaksi_pemesanan/:plat_nomor").get(controllerTransaksiPemesanan.getOne);
    app.route("/transaksi_pemesanan_by_kode_pemesanan/:kode_pemesanan").get(controllerTransaksiPemesanan.getOneByKodePemesanan);
    app.route("/transaksi_pemesanan").post(controllerTransaksiPemesanan.post);
    app.route("/transaksi_pemesanan/get-detail/:kode_pemesanan").get(controllerTransaksiPemesanan.getDetail);
}
