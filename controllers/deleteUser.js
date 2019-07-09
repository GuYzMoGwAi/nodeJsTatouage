const express = require("express");
const app = express();
const User = require ("../database/models/User")

app.get("/:id", (req, res) => {
    // User.findByIdAndRemove({_id: req.params.id}).then(function (usr){})
    User.findByIdAndRemove(
        req.params.id,
        { useFindAndModify: false },
        function (err) {
            if (!err) { 
                req.session.destroy(() => {
                    res.clearCookie("biscuit");
                    console.log('1');
                    res.redirect('/')
                })
            } else {
                console.log('2');
                res.redirect('/contact');
            }
        });
})

module.exports = app;
        
