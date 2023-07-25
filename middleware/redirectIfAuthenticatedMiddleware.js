const asyncHandler = require('express-async-handler');
module.exports = asyncHandler((req, res, next)=>{
    if(req.session.userId){
        return res.redirect('/');
    }
    next();
});