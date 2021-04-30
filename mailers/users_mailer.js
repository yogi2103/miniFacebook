const nodemailer=require('../config/nodemailer');


exports.newUser=(user)=>{
    let htmlString=nodemailer.renderTemplate({
        user:user
    },'/users/new_user.ejs');
    console.log('inside user mailer');
    nodemailer.transporter.sendMail({
        from:'yogesh.baghel86@gmail.com',
        to: user.email,
        subject: 'Welcome to MiniFacebook!',
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