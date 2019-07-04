const User = require ("../database/models/User")

module.exports = (req, res) => {

    User.findByIdAndRemove({_id: req.params.id}).then(function (usr){})
        
        res.redirect ("/adminPage")
}

        
