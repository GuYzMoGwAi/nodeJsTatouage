module.exports = (req,res,next) =>{
    if(!req.files){
        return res.redirect("/articles")
        
    }
    next()
}