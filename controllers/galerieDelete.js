const Galerie = require('../database/models/Galerie')

module.exports =  (req, res) => {

    Galerie.findByIdAndRemove({_id: req.params.id}).then(function(galerie){})
res.redirect('/#galerie')
}