const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Sass');
const db=mongoose.connection;

db.on("error",function(){
    console.log("Error in connect Database");
})

db.once('open',function(){
    console.log("sccussfuly connected into db");
})

module.exports=db;