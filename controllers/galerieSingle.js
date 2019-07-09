const Post = require("../database/models/Galerie")

module.exports = async (req, res) =>{
    const galerie = await Post.findById(req.params.id),
    sess = req.session;
    res.render("galeries",{galerie, sess}) 
} 