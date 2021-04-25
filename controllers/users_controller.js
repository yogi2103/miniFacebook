const User=require('../models/user');

module.exports.profile=(req,res)=>{
    return res.render('user_profile',{
        title:'User Profile'
    });
}

//render the signup page
module.exports.signUp=(req,res)=>{

    //if user is already signed in
    if(req.isAuthenticated()){
        return res.redirect('users/profile');
    }

    return res.render('user_sign_up',{
        title:"MiniFacebook | Sign Up"
    })
}


//render the signin page
module.exports.signIn=(req,res)=>{

    //if user is already signed in
    if(req.isAuthenticated()){
        return res.redirect('users/profile');
    }

    return res.render('user_sign_in',{
        title:"MiniFacebook | Sign In"
    })
}

//get the sign-up data
module.exports.create=(req,res)=>{
    if(req.body.password!=req.body.Confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log('Not able to find');
            return;
        }
        //if user doesn't exist in the schema then create it
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log('error in creating User');
                    return;
                }

                //as user is created then redirect to sign-in page
                return res.redirect('/users/sign-in');
            })
        }

        //if user is already there then redirect it to sign-in page
        return res.redirect('/users/sign-in');
    })
}


//sign-in and create session
module.exports.createSession=(req,res)=>{
    //tooo later
    return res.redirect('/users/profile');  
}

//for sign-out
module.exports.destroySession=(req,res)=>{
    req.logout();
    return res.redirect('/');
}