const UserDB=require('../models/User');
const passport=require('passport');
const LocalStratergy=require('passport-local').Strategy;
//mongoose account locking
const locking=require('mongoose-account-locking');


passport.use(new LocalStratergy({
    usernameField:'email'
},function(email,password,done){
    
    UserDB.getAuthenticated(email,password,function(err,user,reson){
        if(err){
            console.log("error inside passport -->getAuthenticated:: ",err);
            return done(err);
        }
        if(user){
            return done(null,user);
        }

        var resons=UserDB.failedLogin;
        switch(reson){
            case resons.NOT_FOUND:
                console.log("User not found");
                break;
            case resons.PASSWORD_INCORRECT:
                console.log("password increct");
                break;
            case resons.MAX_ATTEMPTS:
                console.log("Your account lock for next 6 min");
        }
        done(null,false);
    })
}));



//
// passport.serializeUser
passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    UserDB.findById(id,function(err,user){
        if(err){
            console.log("user is not found inside deserialize user :: ",err);
            done(err);
        }
        return done(null,user);
    })
})

module.exports=passport;