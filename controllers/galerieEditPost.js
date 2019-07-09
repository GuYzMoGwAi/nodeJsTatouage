const Galerie = require('../database/models/Galerie');
const path = require('path')


//EDIT GALERIE ==========================================
module.exports = (req,res) => {

    const {image} = req.files
       const uploadFile = path.resolve(__dirname, 'public/images',image.name);
       image.mv(uploadFile, (error)=>{
           Galerie.findOneAndUpdate({ image: `/galeries/${image.name}`}, function(error, post){
                   if(error){
                            console.log(error);
                           return;
                   }else{
                           res.redirect('/');
                   }
                    });
            })
    };

