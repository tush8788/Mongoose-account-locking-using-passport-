const express=require('express');
const expressLayout=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const db=require('./config/mongoose');
const expressSession=require('express-session');

const passport=require('passport');
const localStratergy=require('./config/passport-local-strategy');

const port=8000;

const app=express();

app.set('view engine','ejs');
app.set('views','./views');


app.use(expressLayout);
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static('./assets'));

app.use(expressSession({
    name:"user_id",
    secret:"anyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


//handling req
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log("Error in server run :: ",err);
        return;
    }
    console.log("Server is up on port ",port);
})