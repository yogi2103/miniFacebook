const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async (req,res)=>{
    try{
        await Post.create({                   //here we cannot use post.create(req.body) and user should also be logged in
            content:req.body.content,
            user:req.user._id});
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}


module.exports.destroy=async (req,res)=>{
    try{
        let post=await Post.findById(req.params.id);
    if(post.user == req.user.id){   //.id means converting the id to string
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        return res.redirect('back');
    }
    else{
        return res.redirect('bacl');
    }
    }
    catch(err){
        console.log(err);
        return;
    }
}