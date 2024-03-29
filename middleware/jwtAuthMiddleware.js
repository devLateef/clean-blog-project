const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// const protect = asyncHandler(async(req, res, next)=>{
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try {
//             // get token from header
//             token = req.headers.authorization.split(' ')[1];
//             // verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             //Get user from the token
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     if(!token){
//         console.log('Not authorized');
//     }
// });

const protect = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.jwt;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded){

            
            req.user = await User.findById({_id: decoded.userid}).select('-password');
        
            return next();
        } else {
            res.status(302).redirect('/auth');
        }
    }
    res.status(302).redirect('/auth');
})

module.exports = protect;