const express=require('express'); 
const cookieParser = require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');       //for the passport
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());        //for the local-auth

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'miniFacebook',
    //change secret 
    secret:'howdyman',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(error,err);
    }
    console.log(`Running on port: ${port}`);
})