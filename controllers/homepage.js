//post
const Post =require("../database/models/Article")
const Gallery =require("../database/models/Galerie")

module.exports =  async (req,res) => {
        const posts = await Post.find({}).sort({_id:-1}).limit(2)
        const imgGal = await Gallery.find({}).sort({_id:-1}).limit(24)
        // console.log(req.session);    
        res.render ("index",{posts, imgGal}
)}