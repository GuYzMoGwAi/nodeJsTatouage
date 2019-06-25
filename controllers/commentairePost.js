const Post = require("../database/models/Commentaire")

module.exports = (req, res) => {
    
     Post.create(
         {
             ...req.body,
         }
         , (error, post) => {
         res.redirect("/")
         })
        }
    

