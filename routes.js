module.exports = function(app){
    const controllerMobil = require('./controllers/c_mobil');
    const controllerUser = require('./controllers/c_user');
    const controllerTransaksiPenjualan = require("./controllers/c_transaksi_penjualan");

    //MOBIL
    app.route("/mobil").get(controllerMobil.get);
    app.route("/mobil/:plat_nomor").get(controllerMobil.getOne);
    app.route("/mobil").post(controllerMobil.post);
    app.route("/mobil/:plat_nomor").put(controllerMobil.put);
    app.route('/mobil/:plat_nomor').delete(controllerMobil.delete);

    //USER
    app.route("/user").get(controllerUser.get);
    app.route("/user/:User_Id").get(controllerUser.getOne);
    app.route("/user").post(controllerUser.post);
    app.route("/user/:User_Id").put(controllerUser.put);
    app.route('/user/:User_Id').delete(controllerUser.delete);

    //TRANSAKSI
    app.route("/transaksi_penjualan").get(controllerTransaksiPenjualan.get);
    app.route("/transaksi_penjualan/:kode_penjualan").get(controllerTransaksiPenjualan.getOne);
    app.route("/transaksi_penjualan").post(controllerTransaksiPenjualan.post);
    app.route("/transaksi_penjualan/:kode_penjualan").put(controllerTransaksiPenjualan.put);
    app.route('/transaksi_penjualan/:kode_penjualan').delete(controllerTransaksiPenjualan.delete);
}
