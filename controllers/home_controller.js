const Post=require('../models/post');

module.exports.home=(req,res)=>{
    Post.find({}).populate('user').exec((err,posts)=>{
        res.render('home',{
            title:'Home',
            posts:posts
        })
    });

    // return res.end('<h1>Express is up!</h1>');
}