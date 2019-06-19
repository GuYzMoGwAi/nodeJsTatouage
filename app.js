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
//* ARTICLE =============================================
const articleAddcontroller = require("./controllers/articleAdd")
const articleSinglecontroller = require("./controllers/articleSingle")
const articlePostcontroller = require("./controllers/articlePost")
const articleEdit = require ("./controllers/articleEdit")

//* USER ===============================================
const userCreate = require("./controllers/userCreate")
const userRegister = require("./controllers/userRegister")
const userLogin = require ("./controllers/userLogin")
const userLoginAuth = require("./controllers/userLoginAuth")
const userLogout = require ('./controllers/userLogout')

// Galerie
const galerieAddcontroller = require ("./controllers/galerieAdd")
const galerieSinglecontroller = require ("./controllers/galerieSingle")
const galeriePostcontroller = require ("./controllers/galeriePost")
const galerieEdit = require ("./controllers/galerieEdit")

// BODYPARSER ===========================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ROUTES ===============================================
app.get("/", homepage);





// ARTICLES =============================================
app.get("/articles/add", auth, articleAddcontroller)
app.get("/articles/:id", articleSinglecontroller)
app.post("/articles/post", auth, articleValidPost, articlePostcontroller)
app.get("/article-edit/:id", articleEdit)

// GALERIES =============================================
app.get("/galerie/add", auth, galerieAddcontroller)
app.get("/galeries/:id", galerieSinglecontroller)
app.post("/galeries/post", auth ,articleValidPost ,galeriePostcontroller)
app.get("/galerie-edit/:id", galerieEdit)

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
    
//DELETE ARTICLES ========================================
    app.get('/article-delete/:id', function (req, res) {
           const Article = require('./database/models/Article')
           Article.findByIdAndRemove({_id: req.params.id}).then(function(article){})
    res.redirect('/');
});

// GALERIE ==============================================
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
    
//DELETE GALERIE =========================================
    app.get('/galerie-delete/:id', function (req, res) {
           const Galerie = require('./database/models/Galerie')
           Galerie.findByIdAndRemove({_id: req.params.id}).then(function(galerie){})
    res.redirect('/');
});


// USERS ================================================
app.get("/user/create", redirectAuthSuccess, userCreate)
app.post("/user/register", redirectAuthSuccess, userRegister)
app.get ("/user/login", redirectAuthSuccess, userLogin)
app.post("/user/loginAuth", redirectAuthSuccess, userLoginAuth)
app.get ("/user/logout", userLogout)


// CONTACT ==============================================
app.get("/contact", function (req, res) {
    res.render("contact")
})

// ERROR ================================================
app.use ((req, res) => {
    res.render('error404')
})


app.listen(3050, function(){
    // console.log("le serveur tourne sur le port 3000");
    console.log(`http://localhost:3050`);
})