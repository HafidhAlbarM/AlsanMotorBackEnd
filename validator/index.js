exports.postOneUserAuth = (req, res, next) => {
    req.check('User_Id', 'User Id is required').notEmpty();
    req.check('email', 'Email Id is required').notEmpty();
    req.check('Password', 'Password Id is required').notEmpty();
    req.check('plat_nomor', 'Plat Nomor is required').notEmpty();
    req.check('plat_nomor', 'Plat Nomor is required').notEmpty();
    req.check('merk_mobil', 'Merk Mobil is required').notEmpty();
    req.check('nama_mobil', 'Nama Mobil is required').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
}

exports.getOneUserAuth = (req, res, next) => {
    req.check('User_Id', 'User Id is required').notEmpty();
    req.check('Password', 'Password Id is required').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
}

exports.postTransaksiPemesanan = (req, res, next) => {
    req.check('')
}