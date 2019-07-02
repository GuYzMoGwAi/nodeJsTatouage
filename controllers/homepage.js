//post
const Post = require("../database/models/Article")
const Gallery = require("../database/models/Galerie")
const Commentaire = require("../database/models/Commentaire")

module.exports =  async (req,res) => {

        const posts = await Post.find({}).sort({_id:-1}).limit(3)
        const imgGal = await Gallery.find({}).sort({_id:-1}).limit(28)
        const commentaire = await Commentaire.find ({}).sort({_id:-1}).limit(10)
        // console.log(req.session);    
        res.render ("index",{posts, imgGal,commentaire}
)}