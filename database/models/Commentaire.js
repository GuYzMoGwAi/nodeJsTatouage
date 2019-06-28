const mongoose = require("mongoose")

const CommentaireSchema = new mongoose.Schema ({

    content: {
            type: String,
            required: [true, "Texte obligatoire"]
    },

    auteur: {
            type: String
    },

    createDate: {
                type: Date,
                default: new Date()
    }
    
});

const Commentaire = mongoose.model("commentaire", CommentaireSchema);

module.exports = Commentaire;