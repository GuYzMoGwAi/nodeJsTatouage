const User = require("../database/models/User")
module.exports = (req, res, next) => {
    //connnecte toi dans la b.d.
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect("/user/login")
        }
        next()
    })
    // Verification si l'utilisateur est connecté
    //si il est dans la b.d. ok !
    //sinon tu le rediriges vers register si il a pas de compte sinon login.


}