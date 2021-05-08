const development={
    name:'development',
    asset_path:'/assets',
    sesion_cookie_key: 'howdyman',
    db: 'miniFacebook_development',
    smtp:{
        service:'gmail',
        host:'smptp.gmail',
        port:587,
        secure: false,
        auth:{
            user: 'yogesh.baghel86@gmail.com',
            pass: 'sabmohmayahai'
        }
    },
    oauth:{
        clientID:'899850578427-kjco7aebhm0ipns8b5gib6onfe1rs1di.apps.googleusercontent.com',
        clientSecret:'gEn-jUNRNeVmk8KUbA3gilRn',
        callbackURL:'http://localhost:8000/users/auth/google/callback',
    }
}

const production={
    name:'production'
}

module.exports=development;