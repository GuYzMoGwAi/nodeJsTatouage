const express = require("express");
const app = express();
const User = require("../database/models/User")

app.get("/", (req, res) => {
    const sess = req.session;
    console.log(sess);
    res.render("contact", {sess} )
})

module.exports = app;
