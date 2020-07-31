module.exports = function(app){
    const controllerMobil = require('./controllers/c_mobil');
    const controllerUser = require('./controllers/c_user');
    const controllerProduct = require('./controllers/c_product');
    const controllerTransaksiPenjualan = require("./controllers/c_transaksi_penjualan");

    //MOBIL
    app.route("/mobil").get(controllerMobil.get);
    app.route("/mobil/:plat_nomor").get(controllerMobil.getOne);
    app.route("/mobil").post(controllerMobil.post);
    app.route("/mobil/:plat_nomor").put(controllerMobil.put);
    app.route('/mobil/:plat_nomor').delete(controllerMobil.delete);

    //USER (untuk keperluan login & informasi User)
    app.route("/user").get(controllerUser.get);
    app.route("/user/:User_Id").get(controllerUser.getOne);
    app.route("/user").post(controllerUser.post);
    app.route("/user/:User_Id").put(controllerUser.put);
    app.route('/user/:User_Id').delete(controllerUser.delete);

    //PRODUCT
    app.route("/product").get(controllerProduct.get);
    app.route("/product/:Kode_Product").get(controllerProduct.getOne);
    
    //TRANSAKSI YANG SELSAI
    app.route("/transaksi_penjualan/:kode_penjualan").get(controllerTransaksiPenjualan.getOne);
    app.route("/transaksi_penjualan").post(controllerTransaksiPenjualan.post);
    app.route("/transaksi_penjualan/get-detail/:kode_penjualan").get(controllerTransaksiPenjualan.getDetail);
    app.route("/transaksi_penjualan/get-one-detail/:kode_penjualan").get(controllerTransaksiPenjualan.getOneDetail);
    app.route("/transaksi_penjualan/put-detail/:kode_penjualan").get(controllerTransaksiPenjualan.putDetail);
    app.route("/transaksi_penjualan/delete-detail/:kode_penjualan").get(controllerTransaksiPenjualan.deleteDetail);
}
