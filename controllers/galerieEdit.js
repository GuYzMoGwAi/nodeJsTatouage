const Edit = require("../database/models/Galerie");

module.exports = async (req, res) => {

    const galerie = await Edit.findById(req.params.id),
        sess = req.session;
    res.render('galerie-edit', {galerie, sess})
};
