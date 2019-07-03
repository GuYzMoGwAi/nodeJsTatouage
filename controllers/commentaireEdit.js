const Edit = require ("../database/models/Commentaire");

module.exports = async (req,res) => {
    
    const commentaire = await Edit.findById(req.params.id)

    res.render ('commentaire-edit', {commentaire})};
