const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema ({
    title: String,
    content: String,
    auteur: String,
    image: {
        type: String
},
    date: String,
        createDate: {
            type: Date,
            default: new Date()
}
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;