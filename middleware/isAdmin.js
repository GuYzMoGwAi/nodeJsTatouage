const User = require ('../database/models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userId,(err, usr) => {
       
        if (err) {

        }
        if(usr) {
            if(usr.isAdmin) {
                res.locals.admin = true;
            }
        }
        next()
    })
}