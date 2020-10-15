exports.postOneUserAuth = (req, res, next) => {
    req.check('User_Id', 'User Id is required').notEmpty();
    req.check('email', 'Email Id is required').notEmpty();
    req.check('password', 'Password Id is required').notEmpty();
    req.check('User_Id', 'User Id is required').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
}