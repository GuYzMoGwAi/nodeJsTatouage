const Edit = require ("../database/models/Article");

module.exports = async (req,res) => {
    
    const article = await Edit.findById(req.params.id)

    res.render ('article-edit', {article})
}
