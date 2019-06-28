const User = require("../database/models/User")
const Post = require("../database/models/Commentaire")


module.exports = (req, res) => {
  
    User.findById(req.session.userId, (error, user) => {
    // console.log(user)
     Post.create(
         {
             ...req.body,
           auteur: user.pseudo,
         }
         , (error, post) => {
         res.redirect("/#commentaire")
         })
        })
    }
