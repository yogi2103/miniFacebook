module.exports.home=(req,res)=>{
    console.log(req.cookies);
    res.cookie('user_id',25);
    res.render('home',{
        title:'Home'
    })
    // return res.end('<h1>Express is up!</h1>');
}