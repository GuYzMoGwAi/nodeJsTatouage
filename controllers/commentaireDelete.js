const Commentaire = require ('../database/models/Commentaire')

module.exports = (req, res) => {

    Commentaire.findByIdAndRemove({_id: req.params.id}).then(function(commentaire){})
res.redirect('/#liste') 
}