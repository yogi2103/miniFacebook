const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/miniFacebook_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to DB!'));

db.once('open',()=>{
    console.log('Connected to database!');
});

module.exports=db;