const mongoose = require("mongoose")

const GalerieSchema = new mongoose.Schema ({
    image: String,
})

const Galerie = mongoose.model("Galerie", GalerieSchema);

module.exports = Galerie;