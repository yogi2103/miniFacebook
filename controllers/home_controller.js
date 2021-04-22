module.exports.home=(req,res)=>{
    res.render('home',{
        title:'Home'
    })
    // return res.end('<h1>Express is up!</h1>');
}