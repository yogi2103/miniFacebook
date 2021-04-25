const Post=require('../models/post');
module.exports.create=(req,res)=>{
    Post.create({                   //here we cannot use post.create(req.body) and user should also be logged in
        content:req.body.content,
        user:req.user._id},(err,post)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            return res.redirect('back');
        }
    })
}