const User=require('../models/user');

module.exports.profile=(req,res)=>{
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
    })
}

module.exports.update=(req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.redirect('back');
        })
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
module.exports.create=(req,res)=>{
    console.log(req.body);
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
                else{
                    //as user is created then redirect to sign-in page
                    return res.redirect('/users/sign-in');
                }
            })
        }
        else{
            //if user is already there then redirect it to sign-in page
        return res.redirect('/users/sign-in');
        }   
    })
}


//sign-in and create session
module.exports.createSession=(req,res)=>{
    //tooo later
    return res.redirect('/');  
}

//for sign-out
module.exports.destroySession=(req,res)=>{
    req.logout();
    return res.redirect('/');
}