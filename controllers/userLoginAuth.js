const bycrypt = require("bcrypt")
const User = require("../database/models/User")

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            bycrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect("/")
                } else {
                    res.redirect("/")
                }
            })
        } else {
            return res.redirect("/")
        }
    })
}