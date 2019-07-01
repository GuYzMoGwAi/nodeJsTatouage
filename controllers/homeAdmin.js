// const Article = require('../database/models/Article');
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

//    Article.find({},(err, dbArticle)=> {
//         for (i = 0; i < dbArticle.length; i++){dbArticle[i]={_id: dbArticle[i]._id,
//                title: dbArticle[i].title,
//                author: dbArticle[i].author,
//                createDAte: dbArticle[i].createDAte,
//                active: dbArticle[i].active,
//                arNumber: `${i+1}`
//            }
//        }
//     }) 
    res.render ("adminPage",{layout:'admin',usr})
})}

    
