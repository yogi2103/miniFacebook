const User=require('../models/user');

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
    try{
        if(req.user.id==req.params.id){
            await User.findByIdAndUpdate(req.params.id,req.body);
            return res.redirect('back');
        }
        else{
            return res.status(401).send('unauthorized')
        }
    }
    catch(err){
        console.log(err);
        return;
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
            await User.create(req.body);
            //as user is created then redirect to sign-in page
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
    return res.redirect('/');  
}

//for sign-out
module.exports.destroySession=(req,res)=>{
    req.logout();
    return res.redirect('/');
}