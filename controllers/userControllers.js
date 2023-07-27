const User = require('../models/User.js');
const BlogPost = require('../models/BlogPost');
const bcrypt = require('bcrypt');
const {generateToken} = require('../util/jwtAuth');
const asyncHandler = require('express-async-handler');

const homePage = asyncHandler(async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render('index', {
        blogposts
    });
});

const loginForm = asyncHandler((req, res)=>{
    let username = ''
    const data = req.flash('data')[0];
    if (typeof data != 'undefined'){
        username = data.username
    }
    res.render('login', {
        authError: req.flash('validationErrors'),
        username: username,
    });
});

 const loggedInUser = asyncHandler(async(req, res)=>{
    const {username, password} = req.body;
    User.findOne({username:username}, (error, user)=>{
        if(user){
            
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    generateToken(res, user._id);
                    req.session.userId = user._id;
                    res.redirect('/');
                }else{
                    req.flash('validationErrors', 'Invalid Credentials')
                    req.flash('data', req.body);
                    res.redirect('/auth');
                };
            });
        }else{
            req.flash('validationErrors', 'Please Provide Username and Password')
            res.redirect('/auth');
        };
    });
 });


 const storeUser = asyncHandler(async(req,res)=>{
    await User.create(req.body, (error, user) => {
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors',validationErrors);
            req.flash('data',req.body);
            // req.session.validationErrors = validationErrors; 
            return res.redirect('/register');
        };
        res.redirect('/');
    });
});

const newUser = asyncHandler((req, res)=>{
    let username = ""
    let password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('register', {
        // errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
    });
});

const logoutUser = asyncHandler((req, res) => {
    res.cookie('jwt', '', {
        maxAge: new Date(0),
    })
    req.session.destroy(()=>{
        res.redirect('/');
    });
});

module.exports = {
    homePage,
    loginForm,
    loggedInUser,
    storeUser,
    newUser,
    logoutUser,
}