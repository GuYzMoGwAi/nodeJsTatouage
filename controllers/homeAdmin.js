module.exports =  async (req,res) => {
    // console.log(req.session);    
    res.render ("adminPage",{layout:'admin'})
}