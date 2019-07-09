const Post =require("../database/models/Article")

module.exports = async (req, res) =>{
    const article = await Post.findById(req.params.id),
    sess = req.session;
    res.render("articles",{article, sess}) 
} 