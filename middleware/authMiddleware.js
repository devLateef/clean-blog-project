const User = require('../models/User');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler((req, res, next)=>{
    User.findById(req.session.userId, (error, user)=>{
        if(error || !user){
            return res.redirect('/');
        }
        next();
    });
});