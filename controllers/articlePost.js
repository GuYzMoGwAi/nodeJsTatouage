const User = require("../database/models/User")
const path = require("path");
const Post = require("../database/models/Article")

module.exports = (req, res) => {

    const {image} = req.files
    const uploadFile = path.resolve(__dirname, "..", 'public/articles', image.name);

    image.mv(uploadFile, (error) => {
        User.findById(req.session.userId, (error, user) => {
            Post.create({
                ...req.body,
                image: `/articles/${image.name}`,
                auteur: user.pseudo,
            }, (error, post) => {
                res.redirect("/")
            })

        })
    })
}