const express = require("express");
const app = express();
const User = require("../database/models/User")
const bycrypt = require("bcrypt")


app.get("/create", (req, res) => {
    res.render("register", {
        errors: req.flash("registerError"),
        data: req.flash("data")[0]
    })
})


app.post("/register", (req, res) => {
    User.create(
        req.body, (error, user) => {
            if (error) {
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
                req.flash("registerError", registerError)
                req.flash("data", req.body)
                return res.redirect("/")
            }
            res.redirect("/#darkModalForm")
        }
    )
})


app.get ("/login", (req, res) => {
    res.render ("login")
})


app.post("/loginAuth", (req, res) => {
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
})



module.exports = app;