const express=require('express'); 
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;

app.use(expressLayouts);

//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(error,err);
    }
    console.log(`Running on port: ${port}`);
})