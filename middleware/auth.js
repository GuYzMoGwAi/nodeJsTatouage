const User = require("../database/models/User")
module.exports = (req, res, next) => {
    //connnecter à la B.D.D
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect("/user/login")
        }
        next()
    })
    // Verification si l'utilisateur est connecté
    //si il est dans la B.D.D ok !
    //sinon tu le rediriges vers register si il a pas de compte, sinon login.
}  