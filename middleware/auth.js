const User = require("../database/models/User")
module.exports = (req, res, next) => {
    //connnecte toi dans la b.d.
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect("/user/login")
        }
        next()
    })
    // verifier le user
    //si il est dans la b.d.
    //sinon tu le rediriges


}