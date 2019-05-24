const Post =require("../database/models/Galerie")

module.exports = async (req, res) =>{
    const galerie = await Post.findById(req.params.id)
   // console.log(req.params);
    res.render("galeries",{galerie}) 
} 