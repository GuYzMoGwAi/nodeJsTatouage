module.exports = (req,res) => {  
    if(req.session.userId) { 
    return res.render("galerie/add")
    }
    res.redirect("/user/login")
}