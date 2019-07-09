const Article = require('../database/models/Article');
const path = require('path')


module.exports = async (req,res) =>{

    let query = {_id:req.body.articleId}
    const {image} = req.files
       const uploadFile = path.resolve(__dirname, 'public/articles',image.name);
       image.mv(uploadFile, (error)=>{
           Article.findOneAndUpdate(query, {...req.body, image: `/articles/${image.name}`}, function(error, post){
                   if(error){
                            console.log(error);
                           return;
                   }else{
                           res.redirect('/');
                   }
                    });
            })
    };
    