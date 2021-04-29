const express=require('express'); 
const cookieParser = require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');       //for the passport
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-Oauth2-strategy');

const MongoStore=require('connect-mongo')(session); //if server restarts then doesn't loose current session
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');   //for flash messages
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());        //for the local-auth

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));     //makes the upload path availabe and connected miniFacebook folder with uploads folder
app.use(expressLayouts);
//extract style and scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//Mongo store is used to store the session cookies in the db
app.use(session({
    name:'miniFacebook',
    //change secret 
    secret:'howdyman',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    },(err)=>{
        console.log(err || 'conect-mongodb setup Ok!');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(error,err);
    }
    console.log(`Running on port: ${port}`);
})