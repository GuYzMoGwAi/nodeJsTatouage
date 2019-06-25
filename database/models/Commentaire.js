const mongoose = require("mongoose")

const CommentaireSchema = new mongoose.Schema ({

    content: String,
    auteur: String,
    createDate: {
    type: Date,
    default: new Date()
    }
})

const Commentaire = mongoose.model("commentaire", CommentaireSchema);

module.exports = Commentaire;