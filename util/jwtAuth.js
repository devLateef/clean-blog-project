const jwt = require('jsonwebtoken');

const generateToken = (res, userid)=>{
    let token;
    token = jwt.sign({userid}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        maxAge: 24 * 60 * 60 * 1000, // multiply by 1000 means changing default milliseconds to seconds
    });
};


module.exports = generateToken