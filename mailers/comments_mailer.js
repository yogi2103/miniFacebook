const nodemailer=require('../config/nodemailer');


//another way of exporting
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({
        comment:comment
    },'/comments/new_comment.ejs');
    console.log('inside new Comment mailer');
    nodemailer.transporter.sendMail({
        from:'yogesh.baghel86@gmail.com',
        to: comment.user.email,
        subject: 'New comment published!',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}