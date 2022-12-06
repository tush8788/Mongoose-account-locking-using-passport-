const UserDB=require('../models/User');
//signin page
module.exports.signInPage=function(req,res){
    return res.render('signin',{
        title:"Sign in"
    })
}

//signup page
module.exports.signUpPage=function(req,res){
    return res.render('signup',{
        title:"Sign up"
    })
}

//create user
module.exports.createUser=function(req,res){
    console.log(req.body);
    if(req.body.password !=req.body.ConformPassword)
    {
        return res.redirect("back");
    }

    UserDB.create({email:req.body.email,password:req.body.password},function(err,newUser){
        if(err){
            console.log("Error in user Create :: ",err);
            return;
        }
        console.log(newUser);
        return res.redirect("/user/signin");
    })
    // return res.redirect('/user/signin');
}

//create session
module.exports.createSession=function(req,res){
    // console.log(req.body);
    return res.redirect('/');
}