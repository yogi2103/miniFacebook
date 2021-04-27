const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
module.exports.create=async (req,res)=>{
    try{
        let post = await Post.create({                   //here we cannot use post.create(req.body) and user should also be logged in
            content:req.body.content,
            user:req.user._id});
        // let Username=User.findById(user);
        if(req.xhr){    //check if request is of type xmlhttp (ajax)
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post created!'
            })
        }
        req.flash('success','Posted successfully!');
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
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id: req.params.id
                },
                message:'Post deleted!'
            })
        }
        req.flash('success','Post and associated comments Deleted!');
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
    }
    catch(err){
        console.log(err);
        return;
    }
}