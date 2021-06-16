const development={
    name:'development'
}

const production={
    name:'production',
    asset_path: process.env.MINIFACEBOOK_ASSET_PATH,
    sesion_cookie_key: process.env.MINIFACEBOOK_sesion_cookie_key,
    db: process.env.MINIFACEBOOK_db,
    smtp:{
        service:'gmail',
        host:'smptp.gmail',
        port:587,
        secure: false,
        auth:{
            user: process.env.MINIFACEBOOK_user,
            pass: process.env.MINIFACEBOOK_pass
        }
    },
    oauth:{
        clientID: process.env.MINIFACEBOOK_clientID,
        clientSecret:process.env.MINIFACEBOOK_clientSecret,
        callbackURL:process.env.MINIFACEBOOK_callbackURL,
    },
    jwtKey: process.env.MINIFACEBOOK_jwtKey
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);