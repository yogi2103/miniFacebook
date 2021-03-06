const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const usersMailer=require('../mailers/users_mailer');
module.exports.profile=async (req,res)=>{
    try{
        let user=await User.findById(req.params.id);
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.update=async (req,res)=>{
        if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    //going to save the path of uploaded user in the schema
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                    console.log(user.avatar);
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            console.log(err);
            return;
        }
    }
    else{
        return res.status(401).send('unauthorized')
    }
}

//render the signup page
module.exports.signUp=(req,res)=>{

    //if user is already signed in
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_in-up',{
        title:"MiniFacebook | Sign Up"
    })
}


//render the signin page
module.exports.signIn=(req,res)=>{

    //if user is already signed in
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_in-up',{
        title:"MiniFacebook | Sign In"
    })
}

//get the sign-up data
module.exports.create=async (req,res)=>{
    try{
        console.log(req.body);
        if(req.body.password!=req.body.Confirm_password){
            return res.redirect('back');
        }
        let user= await User.findOne({email:req.body.email});
        if(!user){
            let user=await User.create(req.body);
            usersMailer.newUser(user);
            //as user is created then redirect to sign-in page
            req.flash('success','Account created Successfully!');
            return res.redirect('/users/sign-in');
        }
        else{
            //if user is already there then redirect it to sign-in page
            return res.redirect('/users/sign-in');
            }   
    }
    catch(err){
        console.log(err);
        return;
    }
}


//sign-in and create session
module.exports.createSession=(req,res)=>{
    //tooo later
    req.flash('success','Logged in Successfully');
    return res.redirect('/');  
}

//for sign-out
module.exports.destroySession=(req,res)=>{
    req.logout();
    req.flash('success','You have been logged out!');
    return res.redirect('/');
}
