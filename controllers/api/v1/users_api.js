const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
//sign-in and create session
module.exports.createSession= async (req,res)=>{
    //tooo later
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.json(200,{
                message:"Sign-in Successfull here's your token! Keep it safe",
                data:{
                    token:jwt.sign(user.toJSON(),'MiniFacebook',{expiresIn:'10000'})
                }
            })            
        }
        console.log(user);
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid username/Password"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"Internal Server error!"
        })
    }
}