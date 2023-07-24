const User = require('../models/User.js');
const BlogPost = require('../models/BlogPost');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const homePage = asyncHandler(async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render('index', {
        blogposts
    });
});

const loginForm = asyncHandler((req, res)=>{
    res.render('login');
});

 const loggedInUser = asyncHandler(async(req, res)=>{
    const {username, password} = req.body;
    User.findOne({username:username}, (error, user)=>{
        if(user){
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    req.session.userId = user._id;
                    res.redirect('/');
                }else{
                    res.redirect('/auth');
                };
            });
        }else{
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
    var username = ""
    var password = ""
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