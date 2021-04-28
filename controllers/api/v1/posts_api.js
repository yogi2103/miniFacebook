const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
//for getting all the posts taken through home controller code 
module.exports.index=async (req,res)=>{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    return res.json(200,{
        message:"List of Posts",
        posts: posts
    })
}

//destroying

module.exports.destroy=async (req,res)=>{
    try{
        let post=await Post.findById(req.params.id);
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        return res.json(200,{
            "message":"Post and associated comments deleted!"
        });
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal server error!"
        })
    }
}