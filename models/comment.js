const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type: String,
        requied: true
    },
    //comment belongs to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

const Comment=mongoose.mode('Comment',commentSchema);
module.exports=Comment;