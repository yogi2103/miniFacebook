const mongoose=require('mongoose');
//Connecting to database
mongoose.connect('mongodb+srv://yogi:21032103@cluster0.nmyxz.mongodb.net/todo_app?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));


const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to DB!'));

db.once('open',()=>{
    console.log('Connected to database!');
});

module.exports=db;