const Post =require("../database/models/Article")

module.exports = async (req, res) =>{
    const article = await Post.findById(req.params.id)
   // console.log(req.params);
    res.render("articles",{article}) 
} 