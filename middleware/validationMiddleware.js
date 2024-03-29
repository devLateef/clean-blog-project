const asyncHandler = require('express-async-handler');
module.exports = asyncHandler((req, res, next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
        req.flash('postValidationError', 'Please fill all fields')
        return res.redirect('/post/new')
    }
    next();
});