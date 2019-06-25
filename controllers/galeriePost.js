const path = require("path");
const Post = require("../database/models/Galerie")

module.exports = (req, res) => {
    
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, "..", 'public/galeries', image.name);
 
  image.mv(uploadFile,(error) =>{
     Post.create(
         {
             image: `/images/${image.name}`
         }
         , (error, post) => {
         res.redirect("/#galerie")
         })
        })
    }
