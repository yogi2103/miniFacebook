const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onMode:{
        type: String,
        required: true,
        enum:['Post','Comment']     //only these models contain like or basically like is related to these both only
    }
},{
    timestamps: true
})

const Like=mongoose.model('Like',LikeSchema);
module.exports=Like;