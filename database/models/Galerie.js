const mongoose = require("mongoose")

const GalerieSchema = new mongoose.Schema ({
    image: {
            type: String
    },
     
})

const Galerie = mongoose.model("Galerie", GalerieSchema);

module.exports = Galerie;