const nodemailer=require('../config/nodemailer');


//another way of exporting
exports.newComment=(comment)=>{
    console.log('inside new Comment mailer');
    nodemailer.transporter.sendMail({
        from:'yogesh.baghel86@gmail.com',
        to: comment.user.email,
        subject: 'New comment published!',
        html: '<h1>Hey, Your comment is published!</h1>'
    },(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}