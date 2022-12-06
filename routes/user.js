const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controller/user_controller');

//get req
router.get('/signin', userController.signInPage);
router.get('/signup', userController.signUpPage);

//post req create user 
router.post('/create-user', userController.createUser);

//start session login user
router.post('/create-session', passport.authenticate('local',{failureRedirect:"/user/signin"}),userController.createSession);



module.exports = router;