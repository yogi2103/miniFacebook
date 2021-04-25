const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    },
    (email,password,done)=>{
        //find a user and establish the identity
        User.findOne({email:email},(err,user)=>{
            if(err){
                console.log('err in finding user');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }
            //established the identity successfully
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


//deserializing the user from key in the cookies
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log('err in finding user');
                return done(err); 
        }
        return done(null,user);
    })
});

//check if the user is authenticated
passport.checkAuthentication=(req,res,next)=>{
    //If the user is signed in , then pass on the next request
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in then redirect back
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        //req.user contains current signed in user from the session cookie and we're sending it to locals
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;