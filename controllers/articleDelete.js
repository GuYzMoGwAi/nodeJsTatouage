const Article = require('../database/models/Article')

module.exports = (req, res) => {

    Article.findByIdAndRemove({_id: req.params.id}).then(function(article){})

res.redirect('/')
}
