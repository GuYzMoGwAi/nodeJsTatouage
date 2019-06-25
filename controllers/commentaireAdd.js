module.exports = (req,res) => {  
    if(req.session.userId) { 
    return res.render("commentaire/add")
    }
    res.redirect("/user/login")
}