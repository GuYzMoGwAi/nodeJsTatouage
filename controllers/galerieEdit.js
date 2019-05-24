const Edit = require ("../database/models/Galerie");

module.exports = async (req,res) => {
    
    const galerie = await Edit.findById(req.params.id)

    res.render ('galerie-edit', {galerie})};
