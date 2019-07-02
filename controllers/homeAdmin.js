const Article = require('../database/models/Article');
const User = require('../database/models/User');


module.exports = async (req,res) => {

  await User.find({},null,{sort:{name:1}},(err,usr)=> { 

        for (i = 0; i < usr.length; i++){usr[i]= {
           _id: usr[i]._id,
           pseudo: usr[i].pseudo,
           name: usr[i].name,
           email: usr[i].email,
           id: usr[i].id,
           lsNumber: `${i}`,
       }
   }

   Article.find({},(err, adArticle)=> {
        for (i = 0; i < adArticle.length; i++){adArticle[i]={
               _id: adArticle[i]._id,
               image: adArticle[i].image,
               title: adArticle[i].title,
               content: adArticle[i].content,
               arNumber: `${i+1}`
           }
       }
       res.render ('adminPage', {layout:'admin', usr, adArticle})
    }) 
})}

    
