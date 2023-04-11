const User = require('../models/User.js');
const path = require('path');
module.exports = async(req,res)=>{
    await User.create(req.body, (error, user) => {
        if(error){
            return res.redirect('/auth/register')
        };
        res.redirect('/');
    });
};