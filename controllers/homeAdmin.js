const express = require("express");
const app = express();
const Article = require('../database/models/Article');
const User = require('../database/models/User');
const Commentaire = require('../database/models/Commentaire')

app.get('/', async (req, res) => {
    await User.find({}, null, {
        sort: {
            name: 1
        }
    }, (err, usr) => {
        for (i = 0; i < usr.length; i++) {
            usr[i] = {
                _id: usr[i]._id,
                pseudo: usr[i].pseudo,
                name: usr[i].name,
                email: usr[i].email,
                id: usr[i].id,
                lsNumber: `${i}`,
                }
            }
            Article.find({}, (err, adArticle) => {
                for (i = 0; i < adArticle.length; i++) {
                adArticle[i] = {
                    _id: adArticle[i]._id,
                        image: adArticle[i].image,
                        title: adArticle[i].title,
                        content: adArticle[i].content,
                        arNumber: `${i+1}`
                    }
                }
                Commentaire.find({}, (err, adCommentaire) => {
                for (i = 0; i < adCommentaire.length; i++) {
                adCommentaire[i] = {
                    _id: adCommentaire[i]._id,
                    auteur: adCommentaire[i].auteur,
                    content: adCommentaire[i].content,
                    createDate: adCommentaire[i].createDate,
                    coNumber: `${i+1}`
                }
            }
            res.render('adminPage', {layout: 'admin', usr, adArticle, adCommentaire})
        })
    })
})
})
app.get("/delete-profile/:id", (req, res) => {
    // User.findByIdAndRemove({_id: req.params.id}).then(function (usr){})
    User.findByIdAndRemove(
        req.params.id,
        { useFindAndModify: false },
        function (err) {
            if (!err) { 
                res.redirect('/adminPage')
            } else {
                console.log('2');
                res.redirect('/');
            }
        });
})

module.exports = app;