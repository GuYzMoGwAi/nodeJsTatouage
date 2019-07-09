// LES MODULES ====================================
const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const {stripTags} = require ('./helpers/hbs');

// EXPRESS ==============================================
const app = express();

//MongoDB ===============================================
// const db = require('./config/keys').MongoURI
// mongoose
//     .connect(db, {useNewUrlParser: true , useCreateIndex: true})
//     .then(()=> console.log('Connecter à MongoDB Cloud'))
//     .catch(err => console.log(err));
// MONGOOSE CONNECT =====================================
const mongoStore = MongoStore(expressSession)
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true , useCreateIndex: true})

// mongodb+srv://blog:QV1cpLkwrEkO9eZH@blog-afur9.mongodb.net/test?retryWrites=true
app.use(connectFlash())
app.use(expressSession({
    secret: "securite",
    name: "biscuit",
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use(fileupload());

// MIDDLEWARE AUTH ======================================
const auth = require("./middleware/auth")
const redirectAuthSuccess = require("./middleware/redirectAuthSucess")
const isAdmin = require ('./middleware/isAdmin')
// MIDDLEWARE ===========================================
const articleValidPost = require("./middleware/articleValidPost")
app.use("/articles/post", articleValidPost);
app.use("./articles/add", auth);
app.use(isAdmin);

// HANDLEBARS =========================================
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public'));

app.engine('handlebars', exphbs({
    helpers: {
        stripTags : stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use("*", (req, res, next) => {
    res.locals.user = req.session.userId;
    // console.log(res.locals.user);
    next()
})

// *Controller
const homepage = require("./controllers/homepage")
const homeAdmin = require ("./controllers/homeAdmin")
// ARTICLE ===============================================
const articleAddcontroller = require("./controllers/articleAdd")
const articleSinglecontroller = require("./controllers/articleSingle")
const articlePostcontroller = require("./controllers/articlePost")
const articleEdit = require ("./controllers/articleEdit")
const articleDelete = require ("./controllers/articleDelete")

// COMMENTAIRE ============================================
const commentaireAddcontroller = require ("./controllers/commentaireAdd")
const commentairePostcontroller = require ("./controllers/commentairePost")
const commentaireEditcontroller = require ("./controllers/commentaireEdit")
const commentaireDeletecontroller = require ("./controllers/commentaireDelete")


// Galerie ================================================
const galerieAddcontroller = require ("./controllers/galerieAdd")
const galerieSinglecontroller = require ("./controllers/galerieSingle")
const galeriePostcontroller = require ("./controllers/galeriePost")
const galerieEdit = require ("./controllers/galerieEdit")
const galerieDelete = require ("./controllers/galerieDelete")

// USER ==================================================
const userCreate = require("./controllers/userCreate")
const userRegister = require("./controllers/userRegister")
const userLogin = require ("./controllers/userLogin")
const userLoginAuth = require("./controllers/userLoginAuth")
const userLogout = require ("./controllers/userLogout")
const deleteUser = require ("./controllers/deleteUser")


// BODYPARSER =============================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ROUTES ===============================================
app.get("/", homepage, deleteUser);
app.use ("/adminPage", homeAdmin )


// COMMENTAIRES =========================================
app.get ("/commentaire/add", auth, commentaireAddcontroller)
app.post ("/commentaires/post", auth ,commentairePostcontroller)
app.get ("/commentaire-edit/:id", commentaireEditcontroller)
// DELETE COMMENTAIRE ====================================
app.get ('/commentaire-delete/:id', commentaireDeletecontroller) 


// ARTICLES =============================================
app.get("/articles/add", auth, articleAddcontroller)
app.get("/articles/:id", articleSinglecontroller)
app.post("/articles/post", auth, articleValidPost, articlePostcontroller)
app.get("/article-edit/:id", articleEdit)
//DELETE ARTICLES ========================================
app.get('/article-delete/:id', articleDelete)

// GALERIES =============================================
app.get("/galerie/add", auth, galerieAddcontroller)
app.get("/galeries/:id", galerieSinglecontroller)
app.post("/galeries/post", auth ,articleValidPost ,galeriePostcontroller)
app.get("/galerie-edit/:id", galerieEdit)
//DELETE GALERIE =========================================
app.get('/galerie-delete/:id', galerieDelete)

//UTILISATEUR ===========================================
app.use("/delete-user", deleteUser)
app.get("/user/create", redirectAuthSuccess, userCreate)
app.post("/user/register", redirectAuthSuccess, userRegister)
app.get ("/user/login", redirectAuthSuccess, userLogin)
app.post("/user/loginAuth", redirectAuthSuccess, userLoginAuth)
app.get ("/user/logout", userLogout)

//EDIT ARTICLES =========================================
app.post('/article/edit/:id', function(req,res){
    const Article = require('./database/models/Article');
    const path = require('path')

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
    });
    
//EDIT GALERIE ==========================================
app.post('/galerie/edit/:id', function(req,res){
    const Galerie = require('./database/models/Galerie');
    const path = require('path')

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
    });

//EDIT COMMENTAIRE ==========================================
app.post('/commentaire-edit/:id', (req,res) => {
    const Commentaire = require('./database/models/Commentaire');

    let query = {_id:req.params.id}

           Commentaire.findOneAndUpdate(query,{...req.body}, (error, post) => {
                   if(error){
                            console.log(error);
                           return;
                   }else{
                           res.redirect('/#liste');
                   }
                });
            });

// Delete ==============================================
// app.get("/delete-user/:id", (req, res) => {
//     const
//     // User.findByIdAndRemove({_id: req.params.id}).then(function (usr){})
//     User.findByIdAndRemove(
//         req.params.id,
//         { useFindAndModify: false },
//         function (err) {
//             if (!err) {
//                 req.session.destroy(() => {
//                     res.clearCookie("biscuit");
//                     console.log('del ok');
//                     res.redirect('/')
//             })
//             } else {
//                 res.redirect('/');
//             }
//         });
//         res.redirect ("/contact")
// })

// CONTACT ==============================================
const contactPage = require("./controllers/contactPage");
app.use("/contact", contactPage, deleteUser )

// ERROR ================================================
app.use ((req, res) => {
    res.render('error404')
})


app.listen(3050, function(){
    // console.log("le serveur tourne sur le port 3000");
    console.log(`http://localhost:3050`);
})