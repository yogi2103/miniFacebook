module.exports.setFlash=(req,res,next)=>{   //so that it can pass messages to the ejs
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('err')
    }
    next();
}