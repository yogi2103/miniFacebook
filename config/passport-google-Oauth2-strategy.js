const User=require('../models/user');
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

//tell passport to use a new strategy
passport.use(new googleStrategy({
    clientID:'899850578427-kjco7aebhm0ipns8b5gib6onfe1rs1di.apps.googleusercontent.com',
    clientSecret:'gEn-jUNRNeVmk8KUbA3gilRn',
    callbackURL:'https://minifacebook-v1.herokuapp.com/users/auth/google/callback',
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log('error in google strategy',err);
            return;
        }
        console.log(profile);

        //if user exists then set this user as req.user
        if(user){
            return done(null,user);
        }

        //if it doesn't then create the user
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },(err,user)=>{
                if(err){
                    console.log('error in creating user',err);
                    return;
                }
                return done(null,user);
            })
    }})
}))
