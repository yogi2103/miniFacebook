const express=require('express'); 
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);
// const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//     // src:path.join(__dirname,env.asset_path,'scss'),
//     // dest:path.join(__dirname,env.asset_path,'css'),
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

//extract style and scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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