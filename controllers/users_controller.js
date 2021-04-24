module.exports.profile=(req,res)=>{
    return res.render('user_profile',{
        title:'User Profile'
    });
}

//render the signup page
module.exports.signUp=(req,res)=>{
    return res.render('user_sign_up',{
        title:"MiniFacebook | Sign Up"
    })
}


//render the signin page
module.exports.signIn=(req,res)=>{
    return res.render('user_sign_in',{
        title:"MiniFacebook | Sign In"
    })
}

//get the sign-up data
module.exports.create=(req,res)=>{
    //todo later
}
