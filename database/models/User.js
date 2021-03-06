const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    pseudo: {
        type: String,
        required: [true, "Le pseudo est obligatoire"]
    },
    name: {
        type: String,
        required: [true, "Le nom est obligatoire"]

    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Le password est obligatoire"]
    },
    isAdmin: {
        type: Boolean, default: false
    }
});

UserSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted

        next()
    })

})

module.exports = mongoose.model("User", UserSchema)